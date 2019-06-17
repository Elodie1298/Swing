import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Artist} from "../../../../model/Artist";
import {ActionSheetController, AlertController, NavController} from "ionic-angular";
import {ArtistPage} from "../../../../pages/artist/artist";
import {MusicProvider} from "../../../../providers/music";
import {DataProvider} from "../../../../providers/data";
import {Playlist} from "../../../../model/Playlist";


@Component({
  selector: 'artist-list-item',
  templateUrl: 'artist-list-item.html'
})
export class ArtistListItemComponent {

  @Input() artist: Artist;

  @ViewChild('moreButton', {read: ElementRef}) moreButton: ElementRef;

  constructor(private navCtrl: NavController,
              private actionSheetCtrl: ActionSheetController,
              private alertCtrl: AlertController,
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
            this.addPlaylist();
          }
        }
      ]
    });
    actionSheet.present()
      .catch(e => console.log(e));
  }

  addPlaylist() {
    let buttons: Array<any> = new Array<any>();
    if (this.data.playlists.filter(p => p.name=='Favoris').length == 0) {
      Playlist.get(this.data, 'Favoris');
    }
    for (let playlist of this.data.playlists) {
      buttons.push({
        text: playlist.name,
        cssClass: 'button-playlist',
        handler: () => {
          for (let track of this.data.tracks.filter(t => t.album.artists.indexOf(this.artist)>-1)) {
            playlist.trackList.push(track);
          }
        }
      });
    }
    buttons.push({
      text: 'Nouvelle playlist',
      handler: () => {
        this.newPlaylist();
      }
    });

    console.log(buttons);

    let alert = this.alertCtrl.create({
      title: 'Mes playlists',
      buttons: buttons
    });
    alert.present()
      .then(d => console.log(d))
      .catch(e => console.error(e));
  }

  newPlaylist() {
    let alert = this.alertCtrl.create({
      title: 'Nouvelle playlist',
      inputs: [
        {
          name: 'playlist',
          placeholder: 'name'
        }
      ],
      buttons: [
        {
          text: 'Valider',
          handler: (data: any) => {
            let playlist = Playlist.get(this.data, data.playlist);
            for (let track of this.data.tracks.filter(t => t.album.artists.indexOf(this.artist)>-1)) {
              playlist.trackList.push(track);
            }
          }
        }
      ]

    });
    alert.present()
      .then(d => console.log(d))
      .catch(e => console.error(e));
  }

}
