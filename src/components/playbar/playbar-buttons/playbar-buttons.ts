import {Component, EventEmitter, Output} from '@angular/core';

/**
 * Generated class for the PlaybarButtonsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'playbar-buttons-component',
  templateUrl: 'playbar-buttons.html'
})
export class PlaybarButtonsComponent {
  @Output() playpause: EventEmitter<any> = new EventEmitter<any>();
  @Output() previous: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() next: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor() {}

  onPlayPause(ev: any):void {
    this.playpause.emit(ev);
  }

  onPrevious():void {
    this.playpause.emit(true);
  }

  onNext():void {
    this.playpause.emit(true);
  }

}
