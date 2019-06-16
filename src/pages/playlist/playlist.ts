import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import {Playlist} from "../../model/Playlist";

@Component({
  selector: 'page-playlist',
  templateUrl: 'playlist.html',
})
export class PlaylistPage {

  playlist: Playlist;

  constructor(navParams: NavParams) {
    this.playlist = navParams.get("playlist");
  }

}
