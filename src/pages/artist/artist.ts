import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Artist} from "../../model/Artist";
import {Music} from "../../model/Music";
import {Album} from "../../model/Album";

/**
 * Generated class for the ArtistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-artist',
  templateUrl: 'artist.html',
})
export class ArtistPage {

  artist: Artist;
  musics: Array<Music>;
  albums: Array<Album>;

  maxLen: number = 6;

  isPBEnalbed: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.artist = new Artist();
    this.albums = Album.getAlbumList();
    this.musics = Music.getMusicList();
  }

  getFirstItems(items: Array<any>): Array<any> {
    let array = new Array<any>();
    let max = this.maxLen;
    if (items.length < max) {
      max = items.length;
    }
    for (let i=0 ; i<max ; i++) {
      array.push(items[i])
    }
    return array;
  }

}
