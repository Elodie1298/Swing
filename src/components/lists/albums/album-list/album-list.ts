import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Album} from "../../../../model/Album";
import {ListUtil} from "../../../ListUtil";
import {NavController} from "ionic-angular";
import {MoreListsPage} from "../../../../pages/more-lists/more-lists";

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
  @Input() isDivider: boolean = true;

  @Input() max: number;

  @Output() click: EventEmitter<any> = new EventEmitter<any>();

  constructor(private navCtrl: NavController) {}

  // getAlbums(): Array<any> {
  //   let list = this.album_list;
  //   if (this.max != undefined) {
  //     list = ListUtil.getFirstItems(this.album_list, this.max);
  //   }
  //   return ListUtil.parseCol3(list);
  // }

  onClick(ev: any): void {
    this.click.emit(ev);
  }

  more(): void{
    if (this.max != undefined) {
      this.navCtrl.push(MoreListsPage, {title: "Albums", albums: this.albums});
    }
  }

  getAlbums(): Array<any> {
    let list = new Array<any>();
    if (this.max != undefined) {
      list = [{letter: "Albums", list: ListUtil.getFirstItems(this.albums, this.max)}];
    }
    else {
      list = ListUtil.getGroupsByTitle(this.albums);
    }
    for (let l of list) {
      l.list = ListUtil.parseCol3(l.list);
    }
    return list;
  }

}
