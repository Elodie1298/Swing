import { Component } from '@angular/core';
import {PlaylistPage} from "../../../../pages/playlist/playlist";
import {NavController} from "ionic-angular";
import {Playlist} from "../../../../model/Playlist";

/**
 * Generated class for the PlaylistFavItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'playlist-fav-item',
  templateUrl: 'playlist-fav-item.html'
})
export class PlaylistFavItemComponent {

  constructor(private navCtrl: NavController) {
  }

  onClick(): void {
    this.navCtrl.push(PlaylistPage, {playlist: new Playlist()});
  }

}
