import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Artist} from "../../../model/Artist";

@IonicPage()
@Component({
  selector: 'page-artist-list',
  templateUrl: 'artist-list.html',
})
export class ArtistListPage {

  artists: Array<Artist>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.artists = Artist.artists;
  }
}
