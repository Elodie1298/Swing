import { Component } from '@angular/core';
import {DataProvider} from "../../../providers/data/data";
import {NavController} from "ionic-angular";

@Component({
  selector: 'page-artist-list',
  templateUrl: 'artist-list.html',
})
export class ArtistListPage {

  constructor(private data: DataProvider,
              private navCtrl: NavController) {}

  get artists() {
    if (this.data.artists != undefined) {
      return this.data.artists;
    } else {
      return null;
    }
  }

  swipe(ev): void {
    if (Math.abs(ev.deltaX)>Math.abs(ev.deltaY)) {
      if (ev.deltaX>50) this.navCtrl.parent.select(1);
      if (ev.deltaX<50) this.navCtrl.parent.select(3);
    }
  }

}
