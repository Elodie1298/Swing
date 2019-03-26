import { Component } from '@angular/core';

/**
 * Generated class for the AlbumListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'album-list',
  templateUrl: 'album-list.html'
})
export class AlbumListComponent {

  text: string;

  constructor() {
    console.log('Hello AlbumListComponent Component');
    this.text = 'Hello World';
  }

}
