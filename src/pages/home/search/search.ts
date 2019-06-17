import { Component } from '@angular/core';
import {Album} from "../../../model/Album";
import {Track} from "../../../model/Track";
import {Artist} from "../../../model/Artist";
import {Playlist} from "../../../model/Playlist";
import {DataProvider} from "../../../providers/data";
import {Genre} from "../../../model/Genre";
import {Label} from "../../../model/Label";

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  max: number = 3;
  searchValue: string = "";

  constructor(private data: DataProvider) {}

  get tracks(): Array<Track> {
    if (this.searchValue && this.searchValue!='') {
      return this.data.tracks.filter((item: Track) => {
        return (item.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1);
      });
    }
    else {
      return this.data.tracks;
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

  get genres(): Array<Genre> {
    console.log(this.data.genres);
    if (this.searchValue && this.searchValue!='') {
      return this.data.genres.filter((item: Genre) => {
        return (item.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1);
      });
    }
    else {
      return this.data.genres;
    }
  }

  get labels(): Array<Label> {
    if (this.searchValue && this.searchValue!='') {
      return this.data.labels.filter((item: Playlist) => {
        return (item.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1);
      });
    }
    else {
      return this.data.labels;
    }
  }

  getItems(ev: any): void {
    if (ev.target.value) this.searchValue = ev.target.value;
  }

}
