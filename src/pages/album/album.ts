import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Album} from "../../model/Album";
import {Music} from "../../model/Music";

@IonicPage()
@Component({
  selector: 'page-album',
  templateUrl: 'album.html',
})
export class AlbumPage {

  album: Album;
  musics: Array<Music>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.album = navParams.get("album");

    //TODO: get from Music class
    this.musics = new Array<Music>();
  }
}
