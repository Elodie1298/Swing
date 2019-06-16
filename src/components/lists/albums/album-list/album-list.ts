import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ListUtil} from "../../../ListUtil";
import {NavController} from "ionic-angular";
import {MoreListsPage} from "../../../../pages/more-lists/more-lists";
import {Album} from "../../../../model/album";

@Component({
  selector: 'album-list-component',
  templateUrl: 'album-list.html'
})
export class AlbumListComponent {

  @Input() albums: Array<Album>;
  @Input() isDivTitle: boolean = false;
  @Input() isDivider: boolean = true;

  @Input() max: number;

  @Output() click: EventEmitter<any> = new EventEmitter<any>();

  constructor(private navCtrl: NavController) {}

  onClick(ev: any): void {
    this.click.emit(ev);
  }

  more(): void{
    if (this.max != undefined && this.albums!=null) {
      this.navCtrl.push(MoreListsPage, {title: "Albums", albums: this.albums});
    }
  }

  getAlbums(): Array<any> {
    let list = new Array<any>();
    if (this.max != undefined && this.albums!=null) {
      list = [{letter: "Albums", list: ListUtil.getFirstItems(this.albums, this.max)}];
    }
    else if (this.albums!=null) {
      list = ListUtil.getGroupsByTitle(this.albums);
    }
    for (let l of list) {
      l.list = ListUtil.parseCol3(l.list);
    }
    return list;
  }

}
