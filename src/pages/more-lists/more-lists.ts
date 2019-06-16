import {Component} from '@angular/core';
import { NavParams } from 'ionic-angular';
import {Track} from "../../model/Track";
import {Album} from "../../model/Album";
import {Artist} from "../../model/Artist";
import {Playlist} from "../../model/Playlist";
import {Label} from "../../model/Label";
import {Genre} from "../../model/Genre";

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
  labels: Array<Label>;
  genres: Array<Genre>;

  constructor(navParams: NavParams) {
    this.title = navParams.get("title");
    this.tracks = navParams.get("tracks");
    this.albums = navParams.get("albums");
    this.artists = navParams.get("artists");
    this.playlists = navParams.get("playlists");
    this.labels = navParams.get("labels");
    this.genres = navParams.get("genres");
  }
}
