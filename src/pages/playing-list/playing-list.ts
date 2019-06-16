import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import {MusicProvider} from "../../providers/music";


@Component({
  selector: 'page-playing-list',
  templateUrl: 'playing-list.html',
})
export class PlayingListPage {

  constructor(navCtrl: NavController,
              public music: MusicProvider) {

    if (navCtrl.last().name == PlayingListPage.name) {
      navCtrl.removeView(navCtrl.last());
    }

  }



}
