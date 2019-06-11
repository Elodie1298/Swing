import { Component } from '@angular/core';
import {PlaylistPage} from "../../../../pages/playlist/playlist";
import {NavController} from "ionic-angular";
import {DataProvider} from "../../../../providers/data/data";

@Component({
  selector: 'playlist-fav-item',
  templateUrl: 'playlist-fav-item.html'
})
export class PlaylistFavItemComponent {

  constructor(private navCtrl: NavController, private data: DataProvider) {
  }

  onClick(): void {
    this.navCtrl.push(PlaylistPage, {playlist: this.data.playlists.filter(p => p.name == "Favoris")[0]});
  }

}
