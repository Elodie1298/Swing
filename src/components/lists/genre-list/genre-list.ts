import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NavController} from "ionic-angular";
import {MoreListsPage} from "../../../pages/more-lists/more-lists";
import {ListUtil} from "../../ListUtil";
import {Genre} from "../../../model/Genre";


@Component({
  selector: 'genre-list-component',
  templateUrl: 'genre-list.html'
})
export class GenreListComponent {
  @Input() genres: Array<Genre>;
  @Input() isDivTitle: boolean = false;
  @Input() isDivider: boolean = true;
  @Input() number: number = 0;
  @Input() max: number;

  @Input() moreTitle: string = "Genres";

  @Output() click: EventEmitter<any> = new EventEmitter<any>();

  constructor(private navCtrl: NavController) {}

  onClick(ev: any): void {
    this.click.emit(ev);
  }

  more(): void {
    if (this.max != undefined) {
      this.navCtrl.push(MoreListsPage, {title: this.moreTitle, genres: this.genres})
        .catch(e => console.log(e));
    }
  }

  getGenres(): Array<any> {
    if (this.max != undefined) {
      return [{letter: "Genres", list: ListUtil.getFirstItems(this.genres, this.max)}];
    }
    return ListUtil.getGroupsByTitle(this.genres);
  }
}
