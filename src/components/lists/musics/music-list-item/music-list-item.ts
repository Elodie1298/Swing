import {Component, Input} from '@angular/core';
import {Music} from "../../../../model/Music";
import {NavController} from "ionic-angular";
import {PlayingListPage} from "../../../../pages/playing-list/playing-list";

/**
 * Generated class for the MusicListItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'music-list-item',
  templateUrl: 'music-list-item.html'
})
export class MusicListItemComponent {

  @Input() music: Music;

  constructor(private navCtrl: NavController) {}

  onClick():void {
    let navParams = {
      music: this.music
    };
    console.log(this.music);
    this.navCtrl.push(PlayingListPage, navParams);
  }

}
