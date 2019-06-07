import {Component} from '@angular/core';
import {MusicProvider} from "../../../providers/music/music";

@Component({
  selector: 'playbar-buttons-component',
  templateUrl: 'playbar-buttons.html'
})
export class PlaybarButtonsComponent {

  constructor(private music: MusicProvider) {}

  onPlayPause():void {
    this.music.playpause()
  }

  onPrevious():void {
    this.music.previous();
  }

  onNext():void {
    this.music.next();
  }

}
