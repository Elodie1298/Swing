import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Music} from "../../../../model/Music";
import {NavController} from "ionic-angular";
import {MoreListsPage} from "../../../../pages/more-lists/more-lists";
import {ListUtil} from "../../../ListUtil";

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

  @Input() max: number;

  @Output() click: EventEmitter<any> = new EventEmitter<any>();


  constructor(private navCtrl: NavController) {}

  onClick(ev: any): void {
    this.click.emit(ev);
  }

  more(): void {
    this.navCtrl.push(MoreListsPage, {title: "Musiques", musics: this.musics});
  }

  getMusics(): Array<Music> {
    if (this.max != undefined) {
      return ListUtil.getFirstItems(this.musics, this.max);
    }
    return this.musics;
  }
}
