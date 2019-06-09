import {Component, OnInit} from '@angular/core';
import {Music} from "../../../../model/Music";
import {NavParams} from "ionic-angular";


@Component({
  selector: 'music-more-popover',
  templateUrl: 'music-more-popover.html'
})
export class MusicMorePopoverComponent implements OnInit {
  music: Music;

  constructor(private navParams: NavParams) {}

  ngOnInit(): void {
    if (this.navParams.data) {
      this.music = this.navParams.data.music;
    }
  }

  getMetadata(): void {
    console.log(this.music);
  }

}
