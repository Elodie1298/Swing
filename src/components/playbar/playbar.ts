import {Component, Input} from '@angular/core';
import {NavController} from "ionic-angular";
import {PlayingListPage} from "../../pages/playing-list/playing-list";
import {MusicProvider} from "../../providers/music";


@Component({
  selector: 'playbar-component',
  templateUrl: 'playbar.html'
})
export class PlaybarComponent {

  @Input() isCover: boolean = false;

  constructor(private navCtrl: NavController,
              public music: MusicProvider) {}


  onClick():void {
    if (this.isCover) this.navCtrl.push(PlayingListPage);
  }

}
