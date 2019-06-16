import {Component} from '@angular/core';
import {MusicProvider} from "../../providers/music";


@Component({
  selector: 'player-component',
  templateUrl: 'player.html'
})
export class PlayerComponent {

  constructor(public music: MusicProvider) {}

}
