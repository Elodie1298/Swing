import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Music} from "../../../model/Music";


@IonicPage()
@Component({
  selector: 'page-music-list',
  templateUrl: 'music-list.html',
})
export class MusicListPage {

  musics: Array<Music>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.musics = Music.musics;
  }

}
