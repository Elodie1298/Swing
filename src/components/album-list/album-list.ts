import {Component, Input} from '@angular/core';
import {Album} from "../../model/Album";
import {ListUtil} from "../ListUtil";

/**
 * Generated class for the AlbumListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'album-list-component',
  templateUrl: 'album-list.html'
})
export class AlbumListComponent {

  @Input() albums: Array<Album>;

  constructor() {}

  getAlbums(): Array<any> {
    return ListUtil.parseCol3(this.albums);
  }

}
