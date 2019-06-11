import { Component } from '@angular/core';
import {DataProvider} from "../../../providers/data/data";

@Component({
  selector: 'page-artist-list',
  templateUrl: 'artist-list.html',
})
export class ArtistListPage {

  constructor(private data: DataProvider) {}

  get artists() {
    if (this.data.artists != undefined) {
      return this.data.artists;
    } else {
      return null;
    }
  }

}
