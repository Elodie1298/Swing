import {Component} from '@angular/core';
import {DataProvider} from "../../../providers/data/data";
import {Track} from "../../../model/track";


@Component({
  selector: 'page-music-list',
  templateUrl: 'music-list.html',
})
export class MusicListPage {

  constructor(private data: DataProvider) {}

  get tracks(): Track [] {
    if (this.data.tracks != undefined) {
      return this.data.tracks;
    } else {
      return null;
    }
  }
}
