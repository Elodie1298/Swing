import { Component } from '@angular/core';

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

  text: string;

  constructor() {
    console.log('Hello PlayerComponent Component');
    this.text = 'Hello World';
  }

}
