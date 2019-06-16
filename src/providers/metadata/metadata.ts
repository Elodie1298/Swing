import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Util} from "../Util";
import {File} from "@ionic-native/file";
import {Track} from "../../model/track";
import {DataProvider} from "../data/data";
import {Artist} from "../../model/artist";
import {Album} from "../../model/album";

declare var Buffer: any;

@Injectable()
export class MetadataProvider {
  // private headers = new HttpHeaders({
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Methods': 'GET, POST',
  //   'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
  //
  // });

  constructor(public http: HttpClient,
              private file: File,
              private data: DataProvider) {}

  getMetadata(track: Track): void {
    this.getFileInfo(track);
    // this.acrIdentify(file);
  }

  getFileInfo(track: Track) {
    console.log(track.file);
    let path = track.file.split('/');
    if (path[path.length - 4] == Util.dirRoot) {
      this.getArtistFromName(path[path.length - 3])
        .then((artist: Artist) => {
          return this.getAlbumFromName(path[path.length - 2], artist);
        })
        .then((album: Album) => {
          track.album = album;
          this.data.localConnection.getRepository('track')
            .save(track);
        })
        .catch(e => console.log(e));
    } else if (path[path.length - 3] == Util.dirRoot) {
      this.getArtistFromName(path[path.length - 2])
        .then((artist: Artist) => {
          return this.getAlbumFromName("Album inconnu", artist);
        })
        .then((album: Album) => {
          track.album = album;
          this.data.localConnection.getRepository('track')
            .save(track);
        })
        .catch(e => console.log(e));
    } else {
      this.getArtistFromName("Artist inconnu")
        .then((artist: Artist) => {
          return this.getAlbumFromName("Album inconnu", artist);
        })
        .then((album: Album) => {
          track.album = album;
          this.data.localConnection.getRepository('track')
            .save(track);
        })
        .catch(e => console.log(e));
    }
  }

  private getArtistFromName(artistName: string): Promise<Artist> {
    let artists = this.data.artists.filter(a => a.name == artistName);
    if (artists.length == 0) {
      this.data.localConnection.getRepository('artist')
        .create({name: artistName});
      return this.data.localConnection.getRepository('artist')
        .createQueryBuilder('artist')
        .where('artist.name = :name', {name: artistName})
        .getOne()
    } else {
      return new Promise<Artist>((resolve) => resolve(artists[0]));
    }
  }

  private getAlbumFromName(albumName: string, artist: Artist): Promise<Album> {
    let albums = this.data.albums.filter(a =>
      (a.name == albumName && a.artists.indexOf(artist)>-1));
    if (albums.length == 0) {
      let artists = new Array<Artist>();
      artists.push(artist);
      this.data.localConnection.getRepository('album')
        .create({name: albumName, artists: artists});
      return this.data.localConnection.getRepository('album')
        .createQueryBuilder('album')
        .where('album.name = :name', {name: albumName})
        .getOne()
    } else {
      return new Promise<Album>((resolve) => resolve(albums[0]));
    }
  }
    //
    // this.file.resolveLocalFilesystemUrl("file://"+track.file)
    //   .then((file: Entry) => {
    //     file.getMetadata(
    //       (metadata: Metadata) => {
    //         console.log(metadata);
    //         },
    //       e => console.log(e)
    //     );
    //   })
    //   .catch(e => console.log(e));
  // }

  // acrIdentify(path: string) {
  //   let fileName = path.split('/')[path.split('/').length-1];
  //   let directory = path.substring(0, path.length-fileName.length);
  //
  //   //TODO: check proxy config
  //   this.file.readAsArrayBuffer("file://" + directory, fileName)
  //     .then((arrayBuffer: ArrayBuffer) => {
  //       let data = new Buffer(arrayBuffer);
  //       let limit = (data.length>10000)?10000:data.length;
  //       data = data.slice(0, limit);
  //       let timestamp = (new Date()).getTime()/1000;
  //
  //       let stringToSign = [
  //         'POST',
  //         Util.acrOptions.endpoint,
  //         Util.acrOptions.accessKey,
  //         Util.acrOptions.data_type,
  //         Util.acrOptions.signature_version,
  //         timestamp
  //       ].join('\n');
  //
  //       let signature = crypto.HmacSHA1(new Buffer(stringToSign, 'utf-8'), Util.acrOptions.accessSecret);
  //       console.log(signature);
  //
  //       console.log('sample', data.toString('utf-8'));
  //       console.log('sample_bytes', data.length);
  //       console.log(signature.toString());
  //       console.log(timestamp.toString());
  //
  //       let formData = {
  //         sample: data,
  //         access_key: Util.acrOptions.accessKey,
  //         data_type: Util.acrOptions.data_type,
  //         signature_version: Util.acrOptions.signature_version,
  //         signature: signature,
  //         sample_bytes: data.length,
  //         timestamp: timestamp
  //       };
  //
  //       console.log(formData);
  //
  //
  //       //TODO : get this request done
  //       // let url = "http://"+Util.acrOptions.host+Util.acrOptions.endpoint;
  //       let url = "http://localhost:8100/apiACR";
  //       console.log(url);
  //       return this.http.post(url, formData)
  //         .toPromise()
  //         .then(d => console.log(d))
  //         .catch(error => {
  //           console.log(error);
  //           console.error(error.status);
  //           console.error(error.error); // Error message as string
  //           console.error(error.headers);
  //         })
  //     })
  //     // .then(data => console.log(data))
  //     .catch(e => console.log(e));
  // }
}
