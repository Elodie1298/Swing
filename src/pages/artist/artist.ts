import { Component } from '@angular/core';
import {NavParams} from 'ionic-angular';
import {Artist} from "../../model/Artist";
import {Track} from "../../model/Track";
import {Album} from "../../model/Album";
import {ListUtil} from "../../components/ListUtil";
import {DataProvider} from "../../providers/data";

@Component({
  selector: 'page-artist',
  templateUrl: 'artist.html',
})
export class ArtistPage {

  artist: Artist;
  tracks: Array<Track>;
  albums: Array<Album>;

  constructor(navParams: NavParams,
              data: DataProvider) {
    this.artist = navParams.get("artist");
    this.albums = data.albums.filter(a => (a.artist==this.artist || a.artists.indexOf(this.artist)>-1));
    this.tracks = data.tracks.filter(m => (m.album.artist == this.artist || m.album.artists.indexOf(this.artist)>-1));
  }

  getFirstItems(items: Array<any>): Array<any> {
    if (items[0] instanceof Track) {
      return ListUtil.getFirstItems(items, 3);
    }
    return ListUtil.getFirstItems(items, 6);
  }

}
