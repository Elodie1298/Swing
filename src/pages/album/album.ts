import {Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Album} from "../../model/Album";
import {Music} from "../../model/Music";
import {DataProvider} from "../../providers/data/data";

@Component({
  selector: 'page-album',
  templateUrl: 'album.html',
})
export class AlbumPage {

  album: Album;
  musics: Array<Music>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              data: DataProvider) {
    this.album = navParams.get("album");
    this.musics = data.musics.filter(m => m.album == this.album);
  }
}
