import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import {DataProvider} from "../../../providers/data/data";

@Component({
  selector: 'page-artist-list',
  templateUrl: 'artist-list.html',
})
export class ArtistListPage {

  constructor(public navCtrl: NavController,
              public data: DataProvider) {}

}
