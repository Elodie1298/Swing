import {Component, Input} from '@angular/core';
import {Music} from "../../model/Music";

/**
 * Generated class for the PlaybarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'playbar-component',
  templateUrl: 'playbar.html'
})
export class PlaybarComponent {

  @Input() music: Music;

  constructor() {
    this.music = new Music();
  }

}
