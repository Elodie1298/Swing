import { Injectable } from '@angular/core';
import {Track} from "../model/Track";
import {Album} from "../model/Album";
import {Playlist} from "../model/Playlist";
import {Artist} from "../model/Artist";
import {Genre} from "../model/Genre";
import {Label} from "../model/Label";
import {Language} from "../model/Language";
import {SqlProvider} from "./sql";

@Injectable()
export class DataProvider {
  playlists: Array<Playlist> = new Array<Playlist>();
  tracks: Array<Track> = new Array<Track>();
  albums: Array<Album> = new Array<Album>();
  artists: Array<Artist> = new Array<Artist>();
  genres: Array<Genre> = new Array<Genre>();
  labels: Array<Label> = new Array<Label>();
  languages: Array<Language> = new Array<Language>();

  constructor() { }

  static getPlaylist(sql: SqlProvider, data: DataProvider, name: string): Playlist {
    let playlist = Playlist.get(data, name);
    sql.savePlaylist(playlist)
      .catch(e => console.log(e));
    return playlist;
  }

  static addTrackToPlaylist(sql: SqlProvider, playlist: Playlist, track: Track): void {
    playlist.trackList.push(track);
    sql.savePlaylistTrack(playlist, track)
      .catch(e => console.log(e));
  }

  static addTracksToPlaylist(sql: SqlProvider, playlist: Playlist, tracks: Array<Track>): void {
    for (let t of tracks) {
      DataProvider.addTrackToPlaylist(sql, playlist, t);
    }
  }
}
