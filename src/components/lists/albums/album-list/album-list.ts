import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Album} from "../../../../model/Album";
import {ListUtil} from "../../../ListUtil";

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
  @Input() isDivTitle: boolean = false;

  @Output() click: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  getAlbums(): Array<any> {
    return ListUtil.parseCol3(this.albums);
  }

  onClick(ev: any): void {
    this.click.emit(ev);
  }

}
