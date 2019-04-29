import { Injectable } from '@angular/core';
import {File} from '@ionic-native/file';
import {Music} from "../../model/Music";
import {Album} from "../../model/Album";
import {Artist} from "../../model/Artist";
import {DataProvider} from "../data/data";

@Injectable()
export class FilesManagerProvider {
  dev_files_searching = false;
  dev_metadata = false;

  music_ext: string[] = ['mp3'];
  musicRoot: string = "file:///storage/9016-4EF8/";
  dirRoot: string = "Musique";
  temp: number = 10000;

  private musics_temp: Array<Music>;

  interval;

  constructor(private file: File, private data: DataProvider) {
    this.musics_temp = new Array<Music>();

    this.interval = setInterval(() => {
      this.addTemp();
      if (this.dev_files_searching) console.log(Date(), this.data.musics);
    }, 2000, this.temp);
  }

  addTemp(): void {
    for (let m of this.musics_temp) {
      this.data.musics.push(m);
    }
    this.musics_temp = new Array<Music>();
  }


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
            if (this.dev_files_searching) console.log("dir : ", file.fullPath);
            this.file.listDir("file:///", file.fullPath.substring(1))
              .then(list => {
                this.dirLoop(list, 0)
                  .then(_ => resolve(true))
                  .catch(e => reject(e));
              })
              .catch(e => reject(e));
          }

          else if (file.isFile) {
            if (this.dev_files_searching) console.log("file : ", file.fullPath);
            if (this.dev_metadata) console.log(file);
            let ext = file.name.split('.');
            ext = ext[ext.length - 1];
            if (this.music_ext.indexOf(ext) > -1) {
              this.getMetadata(file, ext)
                .then((music: Music) => {
                  this.musics_temp.push(music);
                  resolve(true);
                })
                .catch(err => reject(err));
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

  getMetadata(file, ext: string): Promise<Music> {
    let path = file.fullPath;
    return new Promise<Music>((resolve, reject) => {
      path = path.split('/');
      let fileName = path[path.length - 1];
      let title = fileName.substring(0, fileName.length - (ext.length + 1));


      //TODO : check img and covers
      let album: Album;
      if (path[path.length-4]=="Musique") {
        let artist = Artist.new(path[path.length-3]);
        album = Album.new(artist, path[path.length-2]);
      } else if (path[path.length-3]=="Musique") {
        let artist = Artist.new(path[path.length-2]);
        album = artist.default_alb;
      }
      let music = new Music(title, path, album);

      resolve(music);
    });
  }
}
