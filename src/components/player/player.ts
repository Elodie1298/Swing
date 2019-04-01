import {Component, Input} from '@angular/core';
import {Music} from "../../model/Music";

/**
 * Generated class for the PlayerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'player-component',
  templateUrl: 'player.html'
})
export class PlayerComponent {

  @Input() music: Music;

  constructor() {}

}
