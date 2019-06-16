import { Component } from '@angular/core';
import {DataProvider} from "../../../providers/data/data";
import {Playlist} from "../../../model/playlist";

@Component({
  selector: 'page-playlist-list',
  templateUrl: 'playlist-list.html',
})
export class PlaylistListPage {

  constructor(private data: DataProvider) {}

  get playlists(): Playlist [] {
    if (this.data.playlists != undefined) {
      return this.data.playlists;
    } else {
      return null;
    }
  }
}


