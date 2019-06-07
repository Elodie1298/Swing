import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Playlist} from "../../model/Playlist";

/**
 * Generated class for the PlaylistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
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
