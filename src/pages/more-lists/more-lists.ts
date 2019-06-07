import {Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Music} from "../../model/Music";
import {Album} from "../../model/Album";
import {Artist} from "../../model/Artist";
import {Playlist} from "../../model/Playlist";

@Component({
  selector: 'page-more-lists',
  templateUrl: 'more-lists.html',
})
export class MoreListsPage {

  title: string = "More";

  musics: Array<Music>;
  albums: Array<Album>;
  artists: Array<Artist>;
  playlists: Array<Playlist>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.title = navParams.get("title");
    this.musics = navParams.get("musics");
    this.albums = navParams.get("albums");
    this.artists = navParams.get("artists");
    this.playlists = navParams.get("playlists");
  }
}
