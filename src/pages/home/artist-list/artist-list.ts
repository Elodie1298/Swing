import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Artist} from "../../../model/Artist";

/**
 * Generated class for the ArtistListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-artist-list',
  templateUrl: 'artist-list.html',
})
export class ArtistListPage {

  artists: Array<Artist>;

  isPBEnalbed: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.artists = Artist.artists;
  }
}
