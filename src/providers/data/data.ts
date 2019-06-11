import { Injectable } from '@angular/core';
import {Track} from "../../model/orm data/track";
import {Connection} from "typeorm";
import {Artist} from "../../model/orm data/artist";
import {Album} from "../../model/orm data/album";
import {Playlist} from "../../model/orm data/playlist";

@Injectable()
export class DataProvider {

  localConnection;
  tracks: Array<Track>;
  artists: Array<Artist>;
  albums: Array<Album>;
  playlists: Array<Playlist>;

  constructor() {}

  setConnection(connection: Connection): void {
    this.localConnection = connection;
    setInterval(() => {
      this.localConnection.getRepository("track")
        .createQueryBuilder("track").getMany()
        .then((tracks: Track[]) => {
          this.tracks = tracks;
        });
      this.localConnection.getRepository("album")
        .createQueryBuilder("album").getMany()
        .then((albums: Album[]) => {
          this.albums = albums;
        });
      this.localConnection.getRepository("artist")
        .createQueryBuilder("artist").getMany()
        .then((artists: Artist[]) => {
          this.artists = artists;
        });
      this.localConnection.getRepository("playlist")
        .createQueryBuilder("playlist").getMany()
        .then((playlists: Playlist[]) => {
          this.playlists = playlists;
        });
    }, 2000);
  }


}
