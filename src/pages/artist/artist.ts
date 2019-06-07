import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Artist} from "../../model/Artist";
import {Music} from "../../model/Music";
import {Album} from "../../model/Album";
import {ListUtil} from "../../components/ListUtil";
import {DataProvider} from "../../providers/data/data";

@Component({
  selector: 'page-artist',
  templateUrl: 'artist.html',
})
export class ArtistPage {

  artist: Artist;
  musics: Array<Music>;
  albums: Array<Album>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              data: DataProvider) {
    this.artist = navParams.get("artist");
    this.albums = data.album_list.get(this.artist);
    this.musics = data.musics.filter(m => m.album.artist == this.artist);
  }

  getFirstItems(items: Array<any>): Array<any> {
    if (items[0] instanceof Music) {
      return ListUtil.getFirstItems(items, 3);
    }
    return ListUtil.getFirstItems(items, 6);
  }

}
