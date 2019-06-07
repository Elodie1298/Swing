import {Component, Input} from '@angular/core';
import {Music} from "../../../../model/Music";
import {NavController} from "ionic-angular";
import {PlayingListPage} from "../../../../pages/playing-list/playing-list";
import {MusicProvider} from "../../../../providers/music/music";


@Component({
  selector: 'music-list-item',
  templateUrl: 'music-list-item.html'
})
export class MusicListItemComponent {

  @Input() music: Music;
  @Input() musicList: Array<Music>;

  @Input() number: number;

  constructor(private navCtrl: NavController, private musicServ: MusicProvider) {}

  onClick():void {
    let n = this.musicList.indexOf(this.music);
    this.musicServ.setMediaPlaying(this.musicList, n);
    this.navCtrl.push(PlayingListPage, {music: this.music, musicList: this.musicList});
  }

  isNumber(): boolean {
    return this.number == 0;
  }

}
