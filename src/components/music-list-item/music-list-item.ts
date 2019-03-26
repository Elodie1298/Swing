import { Component } from '@angular/core';

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

  text: string;

  constructor() {
    console.log('Hello MusicListItemComponent Component');
    this.text = 'Hello World';
  }

}
