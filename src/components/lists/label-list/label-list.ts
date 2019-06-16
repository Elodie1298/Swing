import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NavController} from "ionic-angular";
import {MoreListsPage} from "../../../pages/more-lists/more-lists";
import {ListUtil} from "../../ListUtil";
import {Label} from "../../../model/Label";


@Component({
  selector: 'label-list-component',
  templateUrl: 'label-list.html'
})
export class LabelListComponent {
  @Input() labels: Array<Label>;
  @Input() isDivTitle: boolean = false;
  @Input() isDivider: boolean = true;
  @Input() number: number = 0;
  @Input() max: number;

  @Input() moreTitle: string = "Labels";

  @Output() click: EventEmitter<any> = new EventEmitter<any>();

  constructor(private navCtrl: NavController) {}

  onClick(ev: any): void {
    this.click.emit(ev);
  }

  more(): void {
    if (this.max != undefined) {
      this.navCtrl.push(MoreListsPage, {title: this.moreTitle, labels: this.labels})
        .catch(e => console.log(e));
    }
  }

  getLabels(): Array<any> {
    if (this.max != undefined) {
      return [{letter: "Labels", list: ListUtil.getFirstItems(this.labels, this.max)}];
    }
    return ListUtil.getGroupsByTitle(this.labels);
  }
}
