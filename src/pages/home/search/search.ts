import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import {Album} from "../../../model/Album";
import {Music} from "../../../model/Music";
import {Artist} from "../../../model/Artist";
import {Playlist} from "../../../model/Playlist";
import {DataProvider} from "../../../providers/data/data";

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  albums: Array<Album>;
  musics: Array<Music>;
  artists: Array<Artist>;
  playlists: Array<Playlist>;

  max: number = 3;

  constructor(public navCtrl: NavController,
              private data: DataProvider) {
  }

  getItems(ev: any) {
    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.musics = this.data.musics.filter((item: Music) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      this.artists = this.data.artists.filter((item: Artist) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      this.albums = this.data.albums.filter((item: Album) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      this.playlists = this.data.playlists.filter((item: Playlist) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  onClick(ev: any) {
    console.log('clicked');
  }

}
