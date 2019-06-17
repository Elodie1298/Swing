import { Injectable } from '@angular/core';
import {File} from '@ionic-native/file';
import {Track} from "../model/Track";
import {DataProvider} from "./data";
import {MetadataProvider} from "./metadata";
import {Storage} from "@ionic/storage";

@Injectable()
export class FilesManagerProvider {
  track_ext: string[] = ['mp3'];
  cover_ext: string[] = ['jpg', 'png'];
  temp: number = 10000;

  dirNb: number = 0;

  tracksRoot: string;
  dirRoot: string;

  constructor(private file: File,
              private data: DataProvider,
              private storage: Storage,
              private metadata: MetadataProvider) {}


  init(): Promise<any> {
    return this.storage.get('tracksRoot')
      .then((tr: string) => {
        this.tracksRoot = tr;
        return this.storage.get('dirRoot');
      })
      .then((dr: string) => {
        this.dirRoot = dr;
        return this.file.listDir(this.tracksRoot, dr)
          .then((listFiles: any[]) => {return this.getTrackFiles(listFiles)})
          .catch(e => console.log(e));
      })
  }

  private getTrackFiles(listFiles: any[]): Promise<any> {
    this.dirNb = listFiles.length;
    return this.dirLoop(listFiles, 0)
      .then(() => {
        console.log("File loading done");
        return this.metadata.loadAllMetadata();
      });
  }

  private dirLoop(listFiles: any[], i: number): Promise<any> {
    return new Promise<any>(resolve => {
      if (i < listFiles.length && this.data.tracks.length < 3) {
        new Promise((resolve, reject) => {

          let file = listFiles[i];
          if (file.nativeURL.substring(this.tracksRoot.length, file.nativeURL.length-2).split('/').length < 3) {
            let p = Math.trunc((i/this.dirNb)*100);
           console.log(p + '%');
          }

          if (file.isDirectory) {
            this.file.listDir("file:///", file.fullPath.substring(1))
              .then(list => {
                this.dirLoop(list, 0)
                  .then(() => resolve(true))
                  .catch(e => reject(e));
              })
              .catch(e => reject(e));
          }

          else if (file.isFile) {
            let ext = file.name.split('.');
            ext = ext[ext.length - 1];
            if (this.track_ext.indexOf(ext) > -1) {
              let pathL = file.fullPath.split('/');
              let fileName = pathL[pathL.length - 1];
              let title = fileName.substring(0, fileName.length - (ext.length + 1));
              Track.get(this.data, title, file.fullPath);
              resolve(true);
            }
            else if (this.cover_ext.indexOf(ext) > -1) {

              //TODO : check img and covers
              // let path = file.fullPath.split('/');
              // this.storage.get('dirRoot')
              //   .then((dirRoot: string) => {
              //     if (path[path.length-4]==dirRoot) {
              //       let artist = Artist.get(path[path.length-3], this.data);
              //       let album = Album.get(artist, this.data, path[path.length-2]);
              //       album.cover = file.fullPath;
              //     } else if (path[path.length-3]==dirRoot) {
              //       let artist = Artist.get(path[path.length-2], this.data);
              //       artist.img = file.fullPath;
              //     }
              //   });
              resolve(true);
            }
            else {
              resolve(false);
            }
          }
        })
          .then(() => {
            this.dirLoop(listFiles, i+1).then(() => resolve(true));
          })
          .catch(e => console.log(e));
      } else {
        resolve(true);
      }
    });
  }
}
