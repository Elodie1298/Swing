import {Component} from '@angular/core';
import {DataProvider} from "../../../providers/data/data";
import {Track} from "../../../model/track";
import {NavController} from "ionic-angular";


@Component({
  selector: 'page-music-list',
  templateUrl: 'music-list.html',
})
export class MusicListPage {

  constructor(private data: DataProvider,
              private navCtrl: NavController) {}

  get tracks(): Track [] {
    if (this.data.tracks != undefined) {
      return this.data.tracks;
    } else {
      return null;
    }
  }

  swipe(ev): void {
    if (Math.abs(ev.deltaX)>Math.abs(ev.deltaY)) {
      if (ev.deltaX>50) this.navCtrl.parent.select(0);
      if (ev.deltaX<50) this.navCtrl.parent.select(2);
    }
  }
}
