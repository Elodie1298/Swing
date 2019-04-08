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

  @Input() number: number;

  constructor(private navCtrl: NavController) {}

  onClick():void {
    let navParams = {
      music: this.music
    };
    this.navCtrl.push(PlayingListPage, navParams);
  }

  isNumber(): boolean {
    return this.number == 0;
  }

}
