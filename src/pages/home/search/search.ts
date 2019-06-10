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
  max: number = 3;
  searchValue: string;

  constructor(public navCtrl: NavController,
              private data: DataProvider) {
  }

  get musics(): Array<Music> {
    if (this.searchValue && this.searchValue!='') {
      return this.data.musics.filter((item: Music) => {
        return (item.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1);
      });
    }
    else {
      return this.data.musics;
    }
  }

  get artists(): Array<Artist> {
    if (this.searchValue && this.searchValue!='') {
      return this.data.artists.filter((item: Artist) => {
        return (item.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1);
      });
    }
    else {
      return this.data.artists;
    }
  }

  get albums(): Array<Album> {
    if (this.searchValue && this.searchValue!='') {
      return this.data.albums.filter((item: Album) => {
        return (item.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1);
      });
    }
    else {
      return this.data.albums;
    }
  }

  get playlists(): Array<Playlist> {
    if (this.searchValue && this.searchValue!='') {
      return this.data.playlists.filter((item: Playlist) => {
        return (item.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1);
      });
    }
    else {
      return this.data.playlists;
    }
  }

  getItems(ev: any): void {
    this.searchValue = ev.target.value;
  }

}
