import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Artist} from "../../../../model/Artist";
import {ActionSheetController, NavController} from "ionic-angular";
import {ArtistPage} from "../../../../pages/artist/artist";
import {MusicProvider} from "../../../../providers/music";
import {DataProvider} from "../../../../providers/data";


@Component({
  selector: 'artist-list-item',
  templateUrl: 'artist-list-item.html'
})
export class ArtistListItemComponent {

  @Input() artist: Artist;

  @ViewChild('moreButton', {read: ElementRef}) moreButton: ElementRef;

  constructor(private navCtrl: NavController,
              private actionSheetCtrl: ActionSheetController,
              private musicProvider: MusicProvider,
              private data: DataProvider) {}

  onClick(): void {
    this.navCtrl.push(ArtistPage, {artist: this.artist})
      .catch(e => console.log(e));
  }

  more(): void {
    let actionSheet = this.actionSheetCtrl.create({
      title: this.artist.name,
      buttons: [
        {
          text: "Impro",
          icon: 'bonfire',
          handler: () => {this.musicProvider.improFromArtist(this.artist)}
        },
        {
          text: "Ajouter à la liste de lecture",
          icon: 'add',
          handler: () => {this.musicProvider.addTracksRandomPlace(this.data.tracks
            .filter(t => (t.album.artist == this.artist
              || t.album.artists.indexOf(this.artist)>-1)))}
        },
        {
          text: "Lire ensuite",
          icon: 'add',
          handler: () => {this.musicProvider.addTracksNextPlace(this.data.tracks
            .filter(t => (t.album.artist == this.artist
              || t.album.artists.indexOf(this.artist)>-1)))}
        },
        {
          text: "Ajouter à une playlist",
          icon: 'list',
          handler: () => {
            //TODO: add to a playlist
            console.log('add to playlist');
          }
        }
      ]
    });
    actionSheet.present()
      .catch(e => console.log(e));
  }

}
