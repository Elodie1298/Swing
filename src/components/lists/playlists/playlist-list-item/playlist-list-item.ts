import {Component, Input} from '@angular/core';
import {Playlist} from "../../../../model/Playlist";

/**
 * Generated class for the PlaylistListItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'playlist-list-item',
  templateUrl: 'playlist-list-item.html'
})
export class PlaylistListItemComponent {

  @Input() playlist: Playlist;

  constructor() {}

}
