import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import {DataProvider} from "../../../providers/data/data";
import {Track} from "../../../model/orm data/track";
import {Artist} from "../../../model/orm data/artist";
import {Album} from "../../../model/orm data/album";
import {Playlist} from "../../../model/orm data/playlist";

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  max: number = 3;
  searchValue: string;

  constructor(private data: DataProvider) {}

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
