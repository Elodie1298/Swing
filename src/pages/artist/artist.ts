import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Artist} from "../../model/Artist";
import {Music} from "../../model/Music";
import {Album} from "../../model/Album";
import {ListUtil} from "../../components/ListUtil";

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

  isPBEnalbed: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.artist = navParams.get("artist");
    this.albums = Album.getAlbumList();
    this.musics = Music.getMusicList();
  }

  getFirstItems(items: Array<any>): Array<any> {
    if (items[0] instanceof Music) {
      return ListUtil.getFirstItems(items, 3);
    }
    return ListUtil.getFirstItems(items, 6);
  }

}
