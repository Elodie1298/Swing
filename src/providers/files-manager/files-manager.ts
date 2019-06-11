import { Injectable } from '@angular/core';
import {File} from '@ionic-native/file';
import {DataProvider} from "../data/data";
import {Track} from "../../model/orm data/track";

@Injectable()
export class FilesManagerProvider {
  track_ext: string[] = ['mp3'];
  tracksRoot: string = "file:///storage/9016-4EF8/";
  dirRoot: string = "Musique";
  temp: number = 10000;

  trackRepository;

  constructor(private file: File, private data: DataProvider) {}


  init(): void {
    this.trackRepository = this.data.localConnection.getRepository('track');
    this.file.listDir(this.tracksRoot, this.dirRoot)
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
            if (this.track_ext.indexOf(ext) > -1) {
              let name = file.name.substring(0, file.name.length-1-ext.length);

              this.trackRepository.find({file: file.fullPath})
                .then((tracks: Track[]) => {
                  if (tracks.length == 0) {
                    let track = this.trackRepository.create({
                      name: name,
                      file: file.fullPath
                    });
                    this.trackRepository.save(track);
                  }
                  resolve(true);
                })
                .catch(e => console.log(e));
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
}
