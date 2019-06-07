import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Artist} from "../../model/Artist";
import {Music} from "../../model/Music";
import {Album} from "../../model/Album";
import {ListUtil} from "../../components/ListUtil";

@IonicPage()
@Component({
  selector: 'page-artist',
  templateUrl: 'artist.html',
})
export class ArtistPage {

  artist: Artist;
  musics: Array<Music>;
  albums: Array<Album>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.artist = navParams.get("artist");

    //TODO: get from album and music classes
    this.albums = new Array<Album>();
    this.musics = new Array<Music>();
  }

  getFirstItems(items: Array<any>): Array<any> {
    if (items[0] instanceof Music) {
      return ListUtil.getFirstItems(items, 3);
    }
    return ListUtil.getFirstItems(items, 6);
  }

}
