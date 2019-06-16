import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NavController} from "ionic-angular";
import {MoreListsPage} from "../../../../pages/more-lists/more-lists";
import {ListUtil} from "../../../ListUtil";
import {Track} from "../../../../model/track";

@Component({
  selector: 'tracks-list-component',
  templateUrl: 'track-list.html',
})
export class MusicListComponent {
  @Input() tracks: Array<Track>;
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
    if (this.max != undefined) {
      this.navCtrl.push(MoreListsPage, {title: "Musiques", tracks: this.tracks});
    }
  }

  getTracks(): Array<any> {
    if (this.max != undefined) {
      return [{letter: "Musiques", list: ListUtil.getFirstItems(this.tracks, this.max)}];
    }
    return ListUtil.getGroupsByTitle(this.tracks);
  }

}
