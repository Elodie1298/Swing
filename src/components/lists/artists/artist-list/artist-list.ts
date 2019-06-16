import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ListUtil} from "../../../ListUtil";
import {NavController} from "ionic-angular";
import {MoreListsPage} from "../../../../pages/more-lists/more-lists";
import {Artist} from "../../../../model/artist";

@Component({
  selector: 'artist-list-component',
  templateUrl: 'artist-list.html'
})
export class ArtistListComponent {
  @Input() artists: Array<Artist>;
  @Input() isDivTitle: boolean = false;
  @Input() isDivider: boolean = true;
  @Input() max: number;

  @Output() click: EventEmitter<any> = new EventEmitter<any>();

  constructor(private navCtrl: NavController) {}

  getArtists(): Array<any> {
    let list = new Array<any>();
    if (this.max != undefined) {
      list = [{letter: "Artistes", list: ListUtil.getFirstItems(this.artists, this.max)}];
    }
    else {
      list = ListUtil.getGroupsByName(this.artists);
    }
    for (let l of list) {
      l.list = ListUtil.parseCol3(l.list);
    }
    return list;
  }

  more(): void {
    if (this.max != undefined) {
      this.navCtrl.push(MoreListsPage, {title:"Artists", artists: this.artists});
    }
  }

}
