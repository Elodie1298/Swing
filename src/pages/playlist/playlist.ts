import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Playlist} from "../../model/playlist";

@Component({
  selector: 'page-playlist',
  templateUrl: 'playlist.html',
})
export class PlaylistPage {

  playlist: Playlist;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.playlist = navParams.get("playlist");
  }

}
