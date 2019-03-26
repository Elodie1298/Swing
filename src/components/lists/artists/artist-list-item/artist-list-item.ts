import {Component, Input} from '@angular/core';
import {Artist} from "../../../../model/Artist";

/**
 * Generated class for the ArtistListItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'artist-list-item',
  templateUrl: 'artist-list-item.html'
})
export class ArtistListItemComponent {

  @Input() artist: Artist;

  constructor() {}

}
