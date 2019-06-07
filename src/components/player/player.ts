import {Component} from '@angular/core';
import {MusicProvider} from "../../providers/music/music";


@Component({
  selector: 'player-component',
  templateUrl: 'player.html'
})
export class PlayerComponent {

  constructor(public music: MusicProvider) {}

}
