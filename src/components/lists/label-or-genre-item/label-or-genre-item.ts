import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {ActionSheetController, NavController} from "ionic-angular";
import {Label} from "../../../model/Label";
import {Genre} from "../../../model/Genre";
import {MoreListsPage} from "../../../pages/more-lists/more-lists";
import {DataProvider} from "../../../providers/data";


@Component({
  selector: 'label-or-genre-item',
  templateUrl: 'label-or-genre-item.html'
})
export class LabelOrGenreItemComponent {

  @Input() label: Label;
  @Input() genre: Genre;

  @ViewChild('moreButton', {read: ElementRef}) moreButton: ElementRef;

  constructor(private navCtrl: NavController,
              private data: DataProvider,
              private actionSheetCtrl: ActionSheetController) {}

  onClick():void {
    if (this.label) {
      let albums = this.data.albums.filter(a => a.labels.indexOf(this.label)>-1);
      this.navCtrl.push(MoreListsPage, {title: this.label.name, albums: albums})
        .catch(e => console.log(e));
    }
    else if (this.genre) {
      let tracks = this.data.tracks.filter(t => t.genres.indexOf(this.genre)>-1);
      this.navCtrl.push(MoreListsPage, {title: this.genre.name, tracks: tracks})
        .catch(e => console.log(e));
    }
  }

  more(): void {
    let title = (this.genre)? this.genre.name : this.label.name;
    const actionSheet = this.actionSheetCtrl.create({
      title: title,
      buttons: [
        {
          text: "Récupérer les métadonnées",
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present()
      .catch(e => console.log(e));
  }

}
