import { Injectable } from '@angular/core';
import {Track} from "../model/Track";
import {Album} from "../model/Album";
import {Playlist} from "../model/Playlist";
import {Artist} from "../model/Artist";
import {Genre} from "../model/Genre";
import {Label} from "../model/Label";

@Injectable()
export class DataProvider {
  playlists: Array<Playlist> = new Array<Playlist>();
  tracks: Array<Track> = new Array<Track>();
  albums: Array<Album> = new Array<Album>();
  artists: Array<Artist> = new Array<Artist>();
  genres: Array<Genre> = new Array<Genre>();
  labels: Array<Label> = new Array<Label>();

  constructor() { }
}
