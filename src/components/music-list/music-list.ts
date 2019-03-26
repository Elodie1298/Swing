import {Component, Input} from '@angular/core';
import {Music} from "../../model/Music";

/**
 * Generated class for the MusicListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'music-list-component',
  templateUrl: 'music-list.html',
})
export class MusicListComponent {
  @Input() musics: Array<Music>;

  constructor() {}
}
