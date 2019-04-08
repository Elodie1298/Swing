import { Component } from '@angular/core';

/**
 * Generated class for the PlaybarSliderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'playbar-slider',
  templateUrl: 'playbar-slider.html'
})
export class PlaybarSliderComponent {

  songTime: number = 173000; // In milliseconds
  time: number = 50000;

  constructor() {}

}
