import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import {DataProvider} from "../../../providers/data/data";
import {Track} from "../../../model/track";
import {Artist} from "../../../model/artist";
import {Album} from "../../../model/album";
import {Playlist} from "../../../model/playlist";

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  max: number = 3;
  searchValue: string;

  constructor(private data: DataProvider,
              private navCtrl: NavController) {}

  swipe(ev): void {
    if (Math.abs(ev.deltaX)>Math.abs(ev.deltaY)) {
      if (ev.deltaX<50) this.navCtrl.parent.select(1);
    }
  }

  get musics(): Array<Track> {
    if (this.data.tracks != undefined) {
      if (this.searchValue && this.searchValue != '') {
        return this.data.tracks.filter((item: Track) => {
          return (item.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1);
        });
      } else {
        return this.data.tracks;
      }
    }
    else {
      return null;
    }
  }

  get artists(): Array<Artist> {
    if (this.data.artists != undefined) {
      if (this.searchValue && this.searchValue != '') {
        return this.data.artists.filter((item: Artist) => {
          return (item.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1);
        });
      } else {
        return this.data.artists;
      }
    } else {
      return null;
    }
  }

  get albums(): Array<Album> {
    if (this.data.albums != undefined) {
      if (this.searchValue && this.searchValue != '') {
        return this.data.albums.filter((item: Album) => {
          return (item.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1);
        });
      } else {
        return this.data.albums;
      }
    } else {
      return null;
    }
  }

  get playlists(): Array<Playlist> {
    if (this.data.playlists != undefined) {
      if (this.searchValue && this.searchValue != '') {
        return this.data.playlists.filter((item: Playlist) => {
          return (item.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1);
        });
      } else {
        return this.data.playlists;
      }
    } else {
      return null;
    }
  }

  getItems(ev: any): void {
    this.searchValue = ev.target.value;
  }

}
