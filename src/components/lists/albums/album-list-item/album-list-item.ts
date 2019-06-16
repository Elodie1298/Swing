import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Album} from "../../../../model/Album";
import {ActionSheetController, NavController} from "ionic-angular";
import {AlbumPage} from "../../../../pages/album/album";
import {ArtistPage} from "../../../../pages/artist/artist";
import {MusicProvider} from "../../../../providers/music";
import {DataProvider} from "../../../../providers/data";


@Component({
  selector: 'album-list-item',
  templateUrl: 'album-list-item.html'
})
export class AlbumListItemComponent {

  @Input() album: Album;

  @ViewChild('moreButton', {read: ElementRef}) moreButton: ElementRef;

  constructor(private navCtrl: NavController,
              private actionSheetCtrl: ActionSheetController,
              private musicProvider: MusicProvider,
              private data: DataProvider) {}

  onClick(): void {
    this.navCtrl.push(AlbumPage, {album: this.album})
      .catch(e => console.log(e));
  }

  more(): void {
    let actionSheet = this.actionSheetCtrl.create({
      title: this.album.name,
      buttons: [
        {
          text: "Impro",
          icon: 'bonfire',
          handler: () => {this.musicProvider.improFromAlbum(this.album)}
        },
        {
          text: "Ajouter à la liste de lecture",
          icon: 'add',
          handler: () => {this.musicProvider.addTracksRandomPlace(this.data.tracks.filter(t => t.album == this.album))}
        },
        {
          text: "Lire ensuite",
          icon: 'add',
          handler: () => {this.musicProvider.addTracksNextPlace(this.data.tracks.filter(t => t.album == this.album))}
        },
        {
          text: "Ajouter à une playlist",
          icon: 'list',
          handler: () => {
            //TODO: add to a playlist
            console.log('add to playlist');
          }
        },
        {
          text: "Accéder à l'artiste",
          icon: 'person',
          handler: () => {this.navCtrl.push(ArtistPage, {artist: this.album.artist})}
        }
      ]
    });
    actionSheet.present()
      .catch(e => console.log(e));
  }
}
