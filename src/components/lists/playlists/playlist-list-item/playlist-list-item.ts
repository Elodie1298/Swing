import {Component, Input} from '@angular/core';
import {NavController} from "ionic-angular";
import {PlaylistPage} from "../../../../pages/playlist/playlist";
import {Playlist} from "../../../../model/playlist";

@Component({
  selector: 'playlist-list-item',
  templateUrl: 'playlist-list-item.html'
})
export class PlaylistListItemComponent {

  @Input() playlist: Playlist;

  constructor(private navCtrl: NavController) {}

  onClick(): void {
    this.navCtrl.push(PlaylistPage, {playlist: this.playlist});
  }
}
