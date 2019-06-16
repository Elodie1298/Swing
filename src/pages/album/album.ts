import {Component} from '@angular/core';
import { NavParams } from 'ionic-angular';
import {Album} from "../../model/Album";
import {Track} from "../../model/Track";
import {DataProvider} from "../../providers/data";

@Component({
  selector: 'page-album',
  templateUrl: 'album.html',
})
export class AlbumPage {

  album: Album;
  tracks: Array<Track>;

  constructor(public navParams: NavParams,
              data: DataProvider) {
    this.album = navParams.get("album");
    this.tracks = data.tracks.filter(m => m.album == this.album);
  }
}
