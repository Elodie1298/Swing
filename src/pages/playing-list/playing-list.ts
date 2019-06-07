import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {MusicProvider} from "../../providers/music/music";


@Component({
  selector: 'page-playing-list',
  templateUrl: 'playing-list.html',
})
export class PlayingListPage {

  constructor(navCtrl: NavController, public navParams: NavParams,
              public music: MusicProvider) {

    if (navCtrl.last().name == PlayingListPage.name) {
      navCtrl.removeView(navCtrl.last());
    }

  }



}
