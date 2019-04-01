import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Music} from "../../model/Music";

/**
 * Generated class for the PlayingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-playing-list',
  templateUrl: 'playing-list.html',
})
export class PlayingListPage {

  music: Music;
  musicList: Array<Music>;

  constructor(private navCtrl: NavController, public navParams: NavParams) {
    this.music = navParams.get("music");
    this.musicList = Music.getMusicList();

    if (navCtrl.last().name == PlayingListPage.name) {
      navCtrl.removeView(navCtrl.last());
    }

  }



}
