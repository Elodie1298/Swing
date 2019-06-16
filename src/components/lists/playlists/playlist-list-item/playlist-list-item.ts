import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Playlist} from "../../../../model/Playlist";
import {ActionSheetController, NavController} from "ionic-angular";
import {PlaylistPage} from "../../../../pages/playlist/playlist";
import {AlbumPage} from "../../../../pages/album/album";
import {ArtistPage} from "../../../../pages/artist/artist";
import {MusicProvider} from "../../../../providers/music";

@Component({
  selector: 'playlist-list-item',
  templateUrl: 'playlist-list-item.html'
})
export class PlaylistListItemComponent {

  @Input() playlist: Playlist;

  @ViewChild('moreButton', {read: ElementRef}) moreButton: ElementRef;

  constructor(private navCtrl: NavController,
              private musicProvider: MusicProvider,
              private actionSheetCtrl: ActionSheetController) {}

  onClick(): void {
    this.navCtrl.push(PlaylistPage, {playlist: this.playlist})
      .catch(e => console.log(e));
  }

  more(): void {
    let actionSheet = this.actionSheetCtrl.create({
      title: this.playlist.name,
      buttons: [
        {
          text: "Ajouter à la liste de lecture",
          icon: 'add',
          handler: () => {this.musicProvider.addTracksRandomPlace(this.playlist.trackList)}
        }
      ]
    });
    actionSheet.present()
      .catch(e => console.log(e));
  }
}
