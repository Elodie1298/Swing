import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Music} from "../../../../model/Music";
import {ActionSheetController, NavController} from "ionic-angular";
import {PlayingListPage} from "../../../../pages/playing-list/playing-list";
import {MusicProvider} from "../../../../providers/music/music";
import {MetadataProvider} from "../../../../providers/metadata/metadata";


@Component({
  selector: 'music-list-item',
  templateUrl: 'music-list-item.html'
})
export class MusicListItemComponent {

  @Input() music: Music;
  @Input() musicList: Array<Music>;
  @Input() number: number;

  @ViewChild('moreButton', {read: ElementRef}) moreButton: ElementRef;

  constructor(private navCtrl: NavController,
              private musicProvider: MusicProvider,
              private actionSheetCtrl: ActionSheetController,
              private metadataProvider: MetadataProvider) {}

  onClick():void {
    let n = this.musicList.indexOf(this.music);
    this.musicProvider.setMediaPlaying(this.musicList, n);
    this.navCtrl.push(PlayingListPage, {music: this.music, musicList: this.musicList});
  }

  isNumber(): boolean {
    return this.number == 0;
  }

  more() {
    const actionSheet = this.actionSheetCtrl.create({
      title: this.music.name,
      buttons: [
        {
          text: "Récupérer les métadonnées",
          handler: () => {
            this.metadataProvider.acrIdentify(this.music.file);
          }
        }
      ]
    });
    actionSheet.present();
  }
}
