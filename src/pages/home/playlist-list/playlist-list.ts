import { Component } from '@angular/core';
import {DataProvider} from "../../../providers/data/data";
import {Playlist} from "../../../model/playlist";
import {NavController} from "ionic-angular";

@Component({
  selector: 'page-playlist-list',
  templateUrl: 'playlist-list.html',
})
export class PlaylistListPage {

  constructor(private data: DataProvider,
              private navCtrl: NavController) {}

  get playlists(): Playlist [] {
    if (this.data.playlists != undefined) {
      return this.data.playlists;
    } else {
      return null;
    }
  }

  swipe(ev): void {
    if (Math.abs(ev.deltaX)>Math.abs(ev.deltaY)) {
      if (ev.deltaX>50) this.navCtrl.parent.select(2);
      //TODO: if settings uncomment following lines
      // if (ev.deltaX<50) this.navCtrl.parent.select(4);
    }
  }
}


