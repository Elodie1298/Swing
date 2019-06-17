import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Album} from "../../../../model/Album";
import {ActionSheetController, AlertController, NavController} from "ionic-angular";
import {AlbumPage} from "../../../../pages/album/album";
import {ArtistPage} from "../../../../pages/artist/artist";
import {MusicProvider} from "../../../../providers/music";
import {DataProvider} from "../../../../providers/data";
import {Playlist} from "../../../../model/Playlist";


@Component({
  selector: 'album-list-item',
  templateUrl: 'album-list-item.html'
})
export class AlbumListItemComponent {

  @Input() album: Album;

  @ViewChild('moreButton', {read: ElementRef}) moreButton: ElementRef;

  constructor(private navCtrl: NavController,
              private actionSheetCtrl: ActionSheetController,
              private alertCtrl: AlertController,
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
            this.addPlaylist()
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
          for (let track of this.data.tracks.filter(t => t.album==this.album)) {
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
            for (let track of this.data.tracks.filter(t => t.album==this.album)) {
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
