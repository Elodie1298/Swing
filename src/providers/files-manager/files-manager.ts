import { Injectable } from '@angular/core';
import {File} from '@ionic-native/file';
import {Music} from "../../model/Music";

@Injectable()
export class FilesManagerProvider {
  music_ext: string[] = ['mp3'];
  musicRoot: string = "file:///storage/9016-4EF8/";
  dirRoot: string = "Musique";
  temp: number = 10000;

  musics: Array<Music>;
  private musics_temp: Array<Music>;

  interval: number;

  constructor(private file: File) {
    this.musics = new Array<Music>();
    this.musics_temp = new Array<Music>();

    this.interval = setInterval(() => {
      this.addTemp();
      console.log(Date(), this.musics);
    }, 2000, this.temp);
  }

  addTemp(): void {
    for (let m of this.musics_temp) {
      this.musics.push(m);
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
            console.log("dir : ", file.fullPath);
            this.file.listDir("file:///", file.fullPath.substring(1))
              .then(list => {
                this.dirLoop(list, 0)
                  .then(_ => resolve(true))
                  .catch(e => reject(e));
              })
              .catch(e => reject(e));
          }

          else if (file.isFile) {
            console.log("file : ", file.fullPath);
            let ext = file.name.split('.');
            ext = ext[ext.length - 1];
            if (this.music_ext.indexOf(ext) > -1) {
              this.getMetadata(file.fullPath, ext)
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

  private getFiles(listFiles): Promise<any> {
    return new Promise<any>(() => {
      let ans: Promise<any>;
      for (let file of listFiles) {
        if (file.isDirectory) {
          console.log(file.fullPath);
          ans = this.file.listDir("file:///", file.fullPath.substring(1))
            .then((files: any[]) => {
              this.getFiles(files)
                .then(ans => console.log(ans));
            })
            .catch(err => {
              console.log(err)
            });
        } else if (file.isFile) {
          let ext = file.name.split('.');
          ext = ext[ext.length - 1];
          if (this.music_ext.indexOf(ext) > -1) {
            ans = this.getMetadata(file.fullPath, ext)
              .then((music: Music) => {
                this.musics.push(music);
              })
              .catch(err => console.log(err));
          }
        }
      }
      return ans;
    })
  }

  getMetadata(path: string, ext: string): Promise<Music> {
    let music = new Music();
    music.file = path;
    return new Promise<Music>((resolve, reject) => {
      let file = path.split('/')[path.split('/').length - 1];
      music.title = file.substring(0, file.length - (ext.length + 1));
      resolve(music);
    });
  }
}
