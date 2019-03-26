import {Component, Input} from '@angular/core';
import {Music} from "../../../../model/Music";

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

  constructor() {}

}
