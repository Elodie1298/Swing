import { Injectable } from '@angular/core';
import {File} from '@ionic-native/file';
import {Music} from "../../model/Music";

@Injectable()
export class FilesManagerProvider {
  music_ext: string[] = ['mp3'];
  musicRoot: string = "file:///storage/9016-4EF8/";
  dirRoot: string = "Musique";
  temp: number = 1000;

  musics: Array<Music>;
  musics_temp: Array<Music>;

  interval: number;

  constructor(private file: File) {
    this.musics = new Array<Music>();
    this.musics_temp = new Array<Music>();

    this.interval = setInterval(() => {
      this.addTemp();
      console.log('addTemp', Date(), this.musics);
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
      .then((listFiles: any[]) => {
        this.getFiles(listFiles)
          .then(_ => console.log('done'));
      })
      .catch(e => console.log(e))
  }

  private getFiles(listFiles): Promise<any> {
    return new Promise<any>(() => {
      let ans: Promise<any>;
      for (let file of listFiles) {
        if (file.isDirectory) {
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
