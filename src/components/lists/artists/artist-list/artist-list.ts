import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Artist} from "../../../../model/Artist";
import {ListUtil} from "../../../ListUtil";

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
  @Input() isDivTitle: boolean = false;

  @Output() click: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  getArtists(): Array<any> {
    return ListUtil.parseCol3(this.artists);
  }

  onClick(ev: any): void {
    this.click.emit(ev);
  }

}
