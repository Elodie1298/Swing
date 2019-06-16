import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ActionSheetController, NavController} from "ionic-angular";
import {PlayingListPage} from "../../../../pages/playing-list/playing-list";
import {MusicProvider} from "../../../../providers/music/music";
import {MetadataProvider} from "../../../../providers/metadata/metadata";
import {Track} from "../../../../model/track";
import {Album} from "../../../../model/album";


@Component({
  selector: 'track-list-item',
  templateUrl: 'track-list-item.html'
})
export class TrackListItemComponent implements OnInit{

  @Input() track: Track;
  @Input() trackList: Array<Track>;
  @Input() number: number;

  @ViewChild('moreButton', {read: ElementRef}) moreButton: ElementRef;

  album: Album;

  constructor(private navCtrl: NavController,
              private musicProvider: MusicProvider,
              private actionSheetCtrl: ActionSheetController,
              private metadataProvider: MetadataProvider) {}

  ngOnInit(): void {}

  onClick():void {
    console.log("clicked", this.track.name);
    let n = this.trackList.indexOf(this.track);
    this.musicProvider.setMediaPlaying(this.trackList, n);
    this.navCtrl.push(PlayingListPage, {music: this.track, musicList: this.trackList});
  }

  isNumber(): boolean {
    return this.number == 0;
  }

  more() {
    const actionSheet = this.actionSheetCtrl.create({
      title: this.track.name,
      buttons: [
        {
          text: "Récupérer les métadonnées",
          handler: () => {
            this.metadataProvider.getMetadata(this.track);
          }
        }
      ]
    });
    actionSheet.present();
  }
}
