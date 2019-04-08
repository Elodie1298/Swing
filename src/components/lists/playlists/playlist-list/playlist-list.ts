import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Playlist} from "../../../../model/Playlist";
import {NavController} from "ionic-angular";
import {MoreListsPage} from "../../../../pages/more-lists/more-lists";
import {ListUtil} from "../../../ListUtil";

/**
 * Generated class for the PlaylistListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'playlist-list-component',
  templateUrl: 'playlist-list.html'
})
export class PlaylistListComponent {

  @Input() playlists: Array<Playlist>;
  @Input() isDivTitle: boolean = false;
  @Input() isDivider: boolean = true;

  @Input() max: number;

  @Output() click: EventEmitter<any> = new EventEmitter<any>();

  constructor(private navCtrl: NavController) {}

  more(): void {
    if (this.max != undefined) {
      this.navCtrl.push(MoreListsPage, {title: "Playlists", playlists: this.playlists});
    }
  }

  getPlaylists(): Array<any> {
    if (this.max != undefined) {
      return [{letter: "Playlists", list: ListUtil.getFirstItems(this.playlists, this.max)}];
    }
    return ListUtil.getGroupsByName(this.playlists);
  }

}
