import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Track} from "../../../../model/Track";
import {ActionSheetController, AlertController, NavController} from "ionic-angular";
import {PlayingListPage} from "../../../../pages/playing-list/playing-list";
import {MusicProvider} from "../../../../providers/music";
import {MetadataProvider} from "../../../../providers/metadata";
import {AlbumPage} from "../../../../pages/album/album";
import {ArtistPage} from "../../../../pages/artist/artist";
import {DataProvider} from "../../../../providers/data";
import {Playlist} from "../../../../model/Playlist";
import {connectableObservableDescriptor} from "rxjs/observable/ConnectableObservable";


@Component({
  selector: 'track-list-item',
  templateUrl: 'track-list-item.html'
})
export class MusicListItemComponent {

  @Input() track: Track;
  @Input() trackList: Array<Track>;
  @Input() number: number;

  @ViewChild('moreButton', {read: ElementRef}) moreButton: ElementRef;

  constructor(private navCtrl: NavController,
              private musicProvider: MusicProvider,
              private actionSheetCtrl: ActionSheetController,
              private alertCtrl: AlertController,
              private data: DataProvider) {}

  onClick():void {
    let n = this.trackList.indexOf(this.track);
    this.musicProvider.setMediaPlaying(this.trackList, n);
    this.navCtrl.push(PlayingListPage, {track: this.track, trackList: this.trackList})
      .catch(e => console.log(e));
  }

  isNumber(): boolean {
    return this.number == 0;
  }

  more(): void {
    let actionSheet = this.actionSheetCtrl.create({
      title: this.track.name,
      buttons: [
        {
          text: "Impro",
          icon: 'bonfire',
          handler: () => {this.musicProvider.improFromTrack(this.track)}
        },
        {
          text: "Ajouter à la liste de lecture",
          icon: 'add',
          handler: () => {this.musicProvider.addTrackRandomPlace(this.track)}
        },
        {
          text: "Lire ensuite",
          icon: 'add',
          handler: () => {this.musicProvider.addTrackNextPlace(this.track)}
        },
        {
          text: "Ajouter à une playlist",
          icon: 'list',
          handler: () => {
            this.addPlaylist();
          }
        },
        {
          text: "Accéder à l'album",
          icon: 'albums',
          handler: () => {this.navCtrl.push(AlbumPage, {album: this.track.album})}
        },
        {
          text: "Accéder à l'artiste",
          icon: 'person',
          handler: () => {this.navCtrl.push(ArtistPage, {artist: this.track.album.artist})}
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
          playlist.trackList.push(this.track);
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
            playlist.trackList.push(this.track);
          }
        }
      ]

    });
    alert.present()
      .then(d => console.log(d))
      .catch(e => console.error(e));
  }
}
