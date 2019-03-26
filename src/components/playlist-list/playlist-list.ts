import {Component, Input} from '@angular/core';
import {Playlist} from "../../model/Playlist";

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

  constructor() {}

}
