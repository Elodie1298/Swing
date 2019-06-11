import {Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Track} from "../../model/track";
import {Album} from "../../model/album";
import {Artist} from "../../model/artist";
import {Playlist} from "../../model/playlist";

@Component({
  selector: 'page-more-lists',
  templateUrl: 'more-lists.html',
})
export class MoreListsPage {

  title: string = "More";

  tracks: Array<Track>;
  albums: Array<Album>;
  artists: Array<Artist>;
  playlists: Array<Playlist>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.title = navParams.get("title");
    this.tracks = navParams.get("tracks");
    this.albums = navParams.get("albums");
    this.artists = navParams.get("artists");
    this.playlists = navParams.get("playlists");
  }
}
