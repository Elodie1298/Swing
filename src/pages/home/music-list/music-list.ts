import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DataProvider} from "../../../providers/data/data";


@Component({
  selector: 'page-music-list',
  templateUrl: 'music-list.html',
})
export class MusicListPage {

  constructor(public navCtrl: NavController,
              public data: DataProvider) {}
}
