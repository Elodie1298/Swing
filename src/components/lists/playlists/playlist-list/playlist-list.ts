import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Playlist} from "../../../../model/Playlist";

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

  @Output() click: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  onClick(ev: any): void {
    this.click.emit(ev);
  }

}
