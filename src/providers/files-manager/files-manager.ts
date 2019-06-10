import { Injectable } from '@angular/core';
import {File} from '@ionic-native/file';
import {Music} from "../../model/Music";
import {Album} from "../../model/Album";
import {Artist} from "../../model/Artist";
import {DataProvider} from "../data/data";

@Injectable()
export class FilesManagerProvider {
  music_ext: string[] = ['mp3'];
  cover_ext: string[] = ['jpg', 'png'];
  musicRoot: string = "file:///storage/9016-4EF8/";
  dirRoot: string = "Musique";
  temp: number = 10000;

  constructor(private file: File, private data: DataProvider) {}


  init(): void {
    this.file.listDir(this.musicRoot, this.dirRoot)
      .then((listFiles: any[]) => this.getMusicFiles(listFiles))
      .catch(e => console.log(e));
  }

  private getMusicFiles(listFiles): void {
    this.dirLoop(listFiles, 0)
      .then(_ => console.log("done"));
  }

  private dirLoop(listFiles, i): Promise<any> {

    return new Promise<any>(resolve => {
      if (i < listFiles.length) {
        new Promise((resolve, reject) => {

          let file = listFiles[i];

          if (file.isDirectory) {
            this.file.listDir("file:///", file.fullPath.substring(1))
              .then(list => {
                this.dirLoop(list, 0)
                  .then(_ => resolve(true))
                  .catch(e => reject(e));
              })
              .catch(e => reject(e));
          }

          else if (file.isFile) {
            let ext = file.name.split('.');
            ext = ext[ext.length - 1];
            if (this.music_ext.indexOf(ext) > -1) {
              this.getMetadata(file, ext)
                .then(() => {
                  resolve(true);
                })
                .catch(err => reject(err));
            } else if (this.cover_ext.indexOf(ext) > -1) {
              //TODO : check img and covers
              let path = file.fullPath.split('/');
              if (path[path.length-4]=="Musique") {
                let artist = Artist.get(path[path.length-3], this.data);
                let album = Album.get(artist, this.data, path[path.length-2]);
                album.cover = file.fullPath;
              } else if (path[path.length-3]=="Musique") {
                let artist = Artist.get(path[path.length-2], this.data);
                artist.img = file.fullPath;
              }
            } else {
              resolve(false);
            }
          }
        })
          .then(_ => {
            this.dirLoop(listFiles, i+1).then(_ => resolve(true));
          })
          .catch(e => console.log(e));
      } else {
        resolve(true);
      }
    });
  }


  //TODO : delete the part and remplace with metadata service
  getMetadata(file, ext: string): Promise<Music> {
    let path = file.fullPath;
    return new Promise<Music>((resolve, reject) => {
      path = path.split('/');
      let fileName = path[path.length - 1];
      let title = fileName.substring(0, fileName.length - (ext.length + 1));

      let album: Album;
      if (path[path.length-4]=="Musique") {
        let artist = Artist.get(path[path.length-3], this.data);
        album = Album.get(artist, this.data, path[path.length-2]);
      } else if (path[path.length-3]=="Musique") {
        let artist = Artist.get(path[path.length-2], this.data);
        album = artist.default_alb;
      }
      let music = Music.get(this.data, title, file.fullPath, album);

      resolve(music);
    });
  }
}
