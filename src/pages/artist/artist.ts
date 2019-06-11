import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ListUtil} from "../../components/ListUtil";
import {DataProvider} from "../../providers/data/data";
import {Artist} from "../../model/artist";
import {Track} from "../../model/track";
import {Album} from "../../model/album";

@Component({
  selector: 'page-artist',
  templateUrl: 'artist.html',
})
export class ArtistPage {

  artist: Artist;
  tracks: Array<Track>;
  albums: Array<Album>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              data: DataProvider) {
    this.artist = navParams.get("artist");
    this.albums = data.albums.filter(a => a.artists.indexOf(this.artist)>-1);
    this.tracks = new Array<Track>();
    for (let album of this.albums) {
      for (let track of album.tracks) {
        this.tracks.push(track);
      }
    }
  }

  getFirstItems(items: Array<any>): Array<any> {
    if (items[0] instanceof Track) {
      return ListUtil.getFirstItems(items, 3);
    }
    return ListUtil.getFirstItems(items, 6);
  }

}
