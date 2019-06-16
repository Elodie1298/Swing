import {Component} from '@angular/core';
import { NavParams } from 'ionic-angular';
import {Album} from "../../model/album";
import {Track} from "../../model/track";

@Component({
  selector: 'page-album',
  templateUrl: 'album.html',
})
export class AlbumPage {

  album: Album;
  tracks: Array<Track>;

  constructor(navParams: NavParams) {
    this.album = navParams.get("album");
    for (let track of this.album.tracks) {
      this.tracks.push(track);
    }
  }
}
