import { Component } from '@angular/core';
import {MusicProvider} from "../../../providers/music";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'playbar-slider',
  templateUrl: 'playbar-slider.html'
})
export class PlaybarSliderComponent {

  _time: number;

  model = 20;

  interval;

  constructor(public music: MusicProvider) {
    this.interval = setInterval(() => {
      music.position
        .then((time: number) => this._time = Math.trunc(time))
        .catch(e => console.log(e));
    }, 20);
  }

  get rangeForm() {
    return new FormGroup({
      'range': new FormControl({value: this._time, disabled: false})
    });
  }
  get time(): string {
    let min = Math.trunc(this._time/60);
    let minz = "";
    if (min<10) minz = "0";
    let sec = this._time%60;
    let secz = "";
    if (sec<10) secz = "0";
    return minz + min + ":"+ secz + sec;
  }

  get max(): number {
    return this.music.duration;
  }
  get duration(): string {
    let min = Math.trunc(this.music.duration/60);
    let minz = "";
    if (min<10) minz = "0";
    let sec = this.music.duration%60;
    let secz = "";
    if (sec<10) secz = "0";
    return minz + min + ":"+ secz + sec;
  }
}
