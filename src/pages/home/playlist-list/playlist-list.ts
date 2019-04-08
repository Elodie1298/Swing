import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Playlist} from "../../../model/Playlist";

/**
 * Generated class for the PlaylistListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-playlist-list',
  templateUrl: 'playlist-list.html',
})
export class PlaylistListPage {

  playlists: Array<Playlist>;

  isPBEnalbed: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.playlists = Playlist.getPlaylistList()
  }

}
