import {Component, Input} from '@angular/core';
import {Album} from "../../../../model/Album";
import {NavController} from "ionic-angular";
import {AlbumPage} from "../../../../pages/album/album";

/**
 * Generated class for the AlbumListItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'album-list-item',
  templateUrl: 'album-list-item.html'
})
export class AlbumListItemComponent {

  @Input() album: Album;

  constructor(private navCtrl: NavController) {}

  onClick(): void {
    this.navCtrl.push(AlbumPage, {album: this.album});
  }
}
