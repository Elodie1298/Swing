import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Music} from "../../../../model/Music";
import {ActionSheetController, NavController, PopoverController} from "ionic-angular";
import {PlayingListPage} from "../../../../pages/playing-list/playing-list";
import {MusicProvider} from "../../../../providers/music/music";
import {MusicMorePopoverComponent} from "../music-more-popover/music-more-popover";
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
              private popoverCtrl: PopoverController,
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
    // let popover = this.popoverCtrl.create(
    //   MusicMorePopoverComponent,
    //   {
    //     music: this.music,
    //     moreButton: this.moreButton.nativeElement
    //   });
    //
    // console.log(Math.trunc(this.moreButton.nativeElement.getBoundingClientRect().top));
    //
    // let ev = {
    //   target : {
    //     getBoundingClientRect : () => {
    //       return {
    //         top: Math.trunc(this.moreButton.nativeElement.getBoundingClientRect().top)
    //       };
    //     }
    //   }
    // };
    //
    // popover.present({ev: ev});

    const actionSheet = this.actionSheetCtrl.create({
      title: this.music.title,
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
