import {Component} from '@angular/core';
import {DataProvider} from "../../../providers/data";


@Component({
  selector: 'page-track-list',
  templateUrl: 'track-list.html',
})
export class TrackListPage {

  constructor(public data: DataProvider) {}
}
