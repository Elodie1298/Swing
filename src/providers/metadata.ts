import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Util} from "./Util";
import {File} from "@ionic-native/file";
import * as crypto from 'crypto-js';
import {Track} from "../model/Track";
import {Artist} from "../model/Artist";
import {Media} from "@ionic-native/media";
import * as metadata from 'music-metadata';
import {IAudioMetadata} from "music-metadata";
import {DataProvider} from "./data";
import {Label} from "../model/Label";
import {Album} from "../model/Album";
import {Genre} from "../model/Genre";
import {Language} from "../model/Language";

declare var Buffer: any;


@Injectable()
export class MetadataProvider {
  private headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',

  });

  constructor(public http: HttpClient,
              private media: Media,
              private file: File,
              private data: DataProvider) {}

  loadAllMetadata(): Promise<any> {
    return this.getMetadata(this.data.tracks, 0)
      .then(d => console.log('Tracks metadata loaded'))
      .catch(e => console.log(e));
  }

  getMetadata(tracks: Array<Track>, n: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (n < tracks.length) {
        this.musicMetadata(tracks[n])
          .then(() => {return this.getMetadata(tracks, n+1)})
          .then(() => resolve(true))
          .catch(e => reject(e));
        // this.acrIdentify(tracks[n].file);
      }
      else {
        resolve(true);
      }
    });
  }

  musicMetadata(track: Track): Promise<any> {
    let fileName = track.file.split('/')[track.file.split('/').length-1];
    let directory = track.file.substring(0, track.file.length-fileName.length);
    return new Promise<any>((resolve, reject) => {
      this.file.readAsArrayBuffer("file://" + directory, fileName)
        .then((arrayBuffer: ArrayBuffer) => {
          metadata.parseBuffer(new Buffer(arrayBuffer))
            .then(async (metadata: IAudioMetadata) => {
              track.duration = metadata.format.duration;
              let meta = metadata.common;
              let artist = track.album.artist;
              let album = track.album;
              if (meta.artist) {
                artist = Artist.get(meta.artist, this.data);
              }
              if(meta.album) {
                  album = Album.get(artist, this.data, meta.album);
              }
              track.album = album;
              for (let artist of meta.artists) {
                track.album.artists.push(Artist.get(artist, this.data));
              }
              if (meta.year) {
                track.album.year = meta.year;
              } else if (meta.date) {
                try {
                  track.album.year = parseInt(meta.date);
                } catch (e) {
                  console.log(e);
                }
              }
              track.album_nb = meta.disk.no;
              if (meta.genre) {
                for (let genre of meta.genre) {
                  track.genres.push(Genre.get(genre, this.data));
                }
              }
              if (meta.label) {
                for (let label of meta.label) {
                  track.album.labels.push(Label.get(label, this.data));
                }
              }
              if (meta.language) {
                track.language = Language.get(meta.language, this.data);
              }
              console.log(track.name, '- metadata loaded');
              resolve(true);
            })
            .catch(e => reject(e));
        })
        .catch(e => reject(e));
    });
  }

  acrIdentify(path: string): void {
    let fileName = path.split('/')[path.split('/').length-1];
    let directory = path.substring(0, path.length-fileName.length);

    //TODO: check proxy config
    this.file.readAsArrayBuffer("file://" + directory, fileName)
      .then((arrayBuffer: ArrayBuffer) => {
        let data = new Buffer(arrayBuffer);
        let limit = (data.length>10000)?10000:data.length;
        data = data.slice(0, limit);
        let timestamp = (new Date()).getTime()/1000;

        let stringToSign = [
          'POST',
          Util.acrOptions.endpoint,
          Util.acrOptions.accessKey,
          Util.acrOptions.data_type,
          Util.acrOptions.signature_version,
          timestamp
        ].join('\n');

        let signature = crypto.HmacSHA1(new Buffer(stringToSign, 'utf-8'), Util.acrOptions.accessSecret);
        console.log(signature);

        console.log('sample', data.toString('binary'));
        console.log('sample', data.toString('ascii'));
        console.log('sample_bytes', data.length);
        console.log(timestamp.toString());

        let formData = {
          sample: data,
          access_key: Util.acrOptions.accessKey,
          data_type: Util.acrOptions.data_type,
          signature_version: Util.acrOptions.signature_version,
          signature: signature,
          sample_bytes: data.length,
          timestamp: timestamp
        };

        console.log(formData);


        //TODO : get this request done
        // let url = "http://"+Util.acrOptions.host+Util.acrOptions.endpoint;
        let url = "http://localhost:8100/apiACR";
        console.log(url);
        return this.http.post(url, formData)
          .toPromise()
          .then(d => console.log(d))
          .catch(error => {
            console.log(error);
            console.error(error.status);
            console.error(error.error); // Error message as string
            console.error(error.headers);
          })
      })
      // .then(data => console.log(data))
      .catch(e => console.log(e));
  }
}
