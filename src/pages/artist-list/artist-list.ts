import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Artist} from "../../model/Artist";

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
    this.artists = this.parse(Artist.getArtists());
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArtistListPage');
  }

  parse(artists: Array<Artist>): Array<any> {
    console.log(artists);
    let array = new Array();
    let artistArray;
    for (let i=0 ; i<artists.length ; i++) {
      if (i%3 == 0 ){
        if (artistArray != null) {
          array.push(artistArray);
        }
        artistArray = new Array<Artist>();
      }
      console.log("artist");
      artistArray.push(artists[i]);
    }
    array.push(artistArray);
    console.log(array);
    return array;
  }
}
