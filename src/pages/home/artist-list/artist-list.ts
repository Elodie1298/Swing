import { Component } from '@angular/core';
import {DataProvider} from "../../../providers/data";

@Component({
  selector: 'page-artist-list',
  templateUrl: 'artist-list.html',
})
export class ArtistListPage {

  constructor(public data: DataProvider) {}

}
