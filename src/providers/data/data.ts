import { Injectable } from '@angular/core';
import {Music} from "../../model/Music";
import {Artist} from "../../model/Artist";
import {Album} from "../../model/Album";

@Injectable()
export class DataProvider {

  musics: Array<Music>;
  albums: Map<Artist, Array<Album>>;
  artists: Array<Artist>

  constructor() {
    this.musics = new Array<Music>();
    this.albums = new Map<Artist, Array<Album>>();
    this.artists = new Array<Artist>();
  }

}
