import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Artist} from "../../model/Artist";
import {ListUtil} from "../../components/ListUtil";

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.artists = Artist.getArtistList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArtistListPage');
  }


}
