import { Injectable } from '@angular/core';
import {File} from '@ionic-native/file';
import {Track} from "../model/Track";
import {Album} from "../model/Album";
import {Artist} from "../model/Artist";
import {DataProvider} from "./data";
import {MetadataProvider} from "./metadata";
import {Storage} from "@ionic/storage";
import {IAudioMetadata} from "music-metadata";
import {Label} from "../model/Label";
import {Genre} from "../model/Genre";
import {Language} from "../model/Language";
import {SqlProvider} from "./sql";

@Injectable()
export class FilesManagerProvider {
  track_ext: string[] = ['mp3'];
  cover_ext: string[] = ['jpg', 'png'];
  temp: number = 10000;

  achieved: number = 0; // Pourcentage

  tracksRoot: string;
  dirRoot: string;

  constructor(private file: File,
              private data: DataProvider,
              private storage: Storage,
              private sql: SqlProvider,
              private metadata: MetadataProvider) {}


  init(): Promise<any> {
    return this.storage.get('tracksRoot')
      .then((tracksRoot: string) => {
        this.tracksRoot = tracksRoot;
        return this.storage.get('dirRoot');
      })
      .then((dirRoot: string) => {
        this.dirRoot = dirRoot;
        return this.file.listDir(this.tracksRoot, this.dirRoot)
      })
      .then((listFiles: any[]) => {
        return this.dirLoop(listFiles, 0)}
        )
      .catch(e => console.log(e));
  }

  private dirLoop(listFiles: any[], i: number): Promise<any> {

    return new Promise<any>(resolve => {
      if (i < listFiles.length && this.data.tracks.length < 100) {
        new Promise((resolve, reject) => {

          let file = listFiles[i];
          if (file.nativeURL.substring(this.tracksRoot.length, file.nativeURL.length-2).split('/').length < 3) {
            this.achieved = Math.trunc((i/listFiles.length)*100);
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
              let name = fileName.substring(0, fileName.length - (ext.length + 1));
              let path = file.fullPath;
              this.metadata.musicMetadata(file.fullPath)
                .then((metadata: IAudioMetadata) => {
                  let year = (metadata.common.year)?
                    metadata.common.year :
                    (metadata.common.date)? parseInt(metadata.common.date): undefined;
                  let artists = undefined;
                  if (metadata.common.artists) {
                    let artists = new Array<Artist>();
                    for (let artistName of metadata.common.artists) {
                      artists.push(Artist.get(artistName, this.data));
                    }
                  }
                  let labels = undefined;
                  if (metadata.common.label) {
                    labels = new Array<Label>();
                    for (let labelName of metadata.common.label) {
                      labels.push(Label.get(labelName, this.data));
                    }
                  }
                  let genres = undefined;
                  if (metadata.common.genre) {
                    genres = new Array<Label>();
                    for (let genreName of metadata.common.genre) {
                      genres.push(Genre.get(genreName, this.data));
                    }
                  }
                  let artist = Artist.get(metadata.common.artist, this.data);
                  this.sql.saveArtist(artist)
                    .catch(e => console.log(e));
                  let album = Album.get(artist, this.data, metadata.common.album, undefined, year, artists, labels);
                  this.sql.saveAlbum(album)
                    .catch(e => console.log(e));
                  if (artists) {
                    for (let a of artists) {
                      this.sql.saveAlbumArtist(album, a)
                        .catch(e => console.log(e));
                    }
                  }
                  if (labels) {
                    for (let l of labels) {
                      this.sql.saveAlbumLabel(album, l)
                        .catch(e => console.log(e));
                    }
                  }
                  let track = Track.get(this.data, name, path, album,
                    metadata.common.disk.no, metadata.format.duration,
                    Language.get(metadata.common.language, this.data), genres);
                  this.sql.saveTrack(track)
                    .catch(e => console.log(e));
                  if (genres) {
                    for (let g of genres) {
                      this.sql.saveTrackGenre(track, g)
                        .catch(e => console.log(e));
                    }
                  }
                  resolve(true);
                })
                .catch(e => reject(e));
            } else if (this.cover_ext.indexOf(ext) > -1) {

              //TODO : check img and covers
              let path = file.fullPath.split('/');
              if (path[path.length-4]==this.dirRoot) {
                let artist = Artist.get(path[path.length-3], this.data);
                let album = Album.get(artist, this.data, path[path.length-2]);
                album.cover = file.fullPath;
              } else if (path[path.length-3]==this.dirRoot) {
                let artist = Artist.get(path[path.length-2], this.data);
                artist.img = file.fullPath;
              }
            } else {
              resolve(false);
            }
          }
        })
          .then(() => {
            this.dirLoop(listFiles, i+1).then(() => resolve(true));
          })
          // .catch(e => console.log(e));
      } else {
        resolve(true);
      }
    });
  }
}
