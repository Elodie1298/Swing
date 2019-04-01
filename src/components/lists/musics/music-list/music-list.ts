import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Music} from "../../../../model/Music";

/**
 * Generated class for the MusicListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'music-list-component',
  templateUrl: 'music-list.html',
})
export class MusicListComponent {
  @Input() musics: Array<Music>;
  @Input() isDivTitle: boolean = false;

  @Input() isDivider: boolean = true;
  @Input() number: number = 0;

  @Output() click: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  onClick(ev: any): void {
    this.click.emit(ev);
  }
}
