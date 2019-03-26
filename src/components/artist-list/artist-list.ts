import { Component } from '@angular/core';

/**
 * Generated class for the ArtistListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'artist-list',
  templateUrl: 'artist-list.html'
})
export class ArtistListComponent {

  text: string;

  constructor() {
    console.log('Hello ArtistListComponent Component');
    this.text = 'Hello World';
  }

}
