import { Component } from '@angular/core';
import {MusicProvider} from "../../../providers/music/music";

@Component({
  selector: 'playbar-slider',
  templateUrl: 'playbar-slider.html'
})
export class PlaybarSliderComponent {

  time: number;

  interval;

  constructor(public music: MusicProvider) {
    this.interval = setInterval(() => {
      this.music.position
        .then((time: number) => this.time = time)
        .catch(e => console.log(e));
    }, 20);
  }

}
