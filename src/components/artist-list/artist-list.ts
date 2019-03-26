import {Component, Input} from '@angular/core';
import {Artist} from "../../model/Artist";
import {ListUtil} from "../ListUtil";

/**
 * Generated class for the ArtistListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'artist-list-component',
  templateUrl: 'artist-list.html'
})
export class ArtistListComponent {
  @Input() artists: Array<Artist>;

  constructor() {}

  getArtists(): Array<any> {
    return ListUtil.parseCol3(this.artists);
  }

}
