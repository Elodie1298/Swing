import {Component, Input} from '@angular/core';
import {NavController} from "ionic-angular";
import {ArtistPage} from "../../../../pages/artist/artist";
import {Artist} from "../../../../model/artist";

@Component({
  selector: 'artist-list-item',
  templateUrl: 'artist-list-item.html'
})
export class ArtistListItemComponent {

  @Input() artist: Artist;

  constructor(private navCtrl: NavController) {}

  onClick(): void {
    this.navCtrl.push(ArtistPage, {artist: this.artist});
  }

}
