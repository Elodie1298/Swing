import {Component, Input} from '@angular/core';
import {Music} from "../../model/Music";
import {NavController} from "ionic-angular";
import {PlayingListPage} from "../../pages/playing-list/playing-list";

/**
 * Generated class for the PlaybarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'playbar-component',
  templateUrl: 'playbar.html'
})
export class PlaybarComponent {

  @Input() music: Music;
  @Input() isCover: boolean = false;

  constructor(private navCtrl: NavController) {
    this.music = new Music("Musique", null);
  }

  onClick():void {
    this.navCtrl.push(PlayingListPage, {music: this.music});
  }

}
