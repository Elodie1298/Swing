import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Track} from "../../../../model/Track";
import {NavController} from "ionic-angular";
import {MoreListsPage} from "../../../../pages/more-lists/more-lists";
import {ListUtil} from "../../../ListUtil";

@Component({
  selector: 'track-list-component',
  templateUrl: 'track-list.html',
})
export class MusicListComponent {
  @Input() tracks: Array<Track>;
  @Input() isDivTitle: boolean = false;
  @Input() isDivider: boolean = true;
  @Input() number: number;
  @Input() max: number;

  @Input() moreTitle: string = "Musiques";

  @Output() click: EventEmitter<any> = new EventEmitter<any>();

  constructor(private navCtrl: NavController) {}

  onClick(ev: any): void {
    this.click.emit(ev);
  }

  more(): void {
    if (this.max != undefined) {
      this.navCtrl.push(MoreListsPage, {title: this.moreTitle, tracks: this.tracks})
        .catch(e => console.log(e));
    }
  }

  getMusics(): Array<any> {
    if (this.isDivider || this.isDivTitle) {
      if (this.max != undefined) {
        return [{letter: "Musiques", list: ListUtil.getFirstItems(this.tracks, this.max)}];
      }
      return ListUtil.getGroupsByTitle(this.tracks);
    }
    else {
      return [{list: this.tracks}];
    }
  }
}
