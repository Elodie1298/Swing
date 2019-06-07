import { Injectable } from '@angular/core';
import {Music} from "../../model/Music";
import {Album} from "../../model/Album";
import {Playlist} from "../../model/Playlist";
import {Artist} from "../../model/Artist";

@Injectable()
export class DataProvider {
  playlists: Array<Playlist> = new Array<Playlist>();

  musics: Array<Music> = new Array<Music>();
  music_list: Map<Album, Array<Music>> = new Map<Album, Array<Music>>();

  albums: Array<Album> = new Array<Album>();
  album_list: Map<Artist, Array<Album>> = new Map<Artist, Array<Album>>();

  artists: Array<Artist> = new Array<Artist>();

  constructor() { }
}
