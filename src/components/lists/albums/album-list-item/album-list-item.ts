import {Component, Input} from '@angular/core';
import {NavController} from "ionic-angular";
import {AlbumPage} from "../../../../pages/album/album";
import {Album} from "../../../../model/album";

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
