import { Component } from '@angular/core';
import {DataProvider} from "../../../providers/data/data";

@Component({
  selector: 'page-playlist-list',
  templateUrl: 'playlist-list.html',
})
export class PlaylistListPage {

  constructor(public data: DataProvider) {}
}


