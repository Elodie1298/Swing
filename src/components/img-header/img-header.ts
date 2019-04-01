import {Component, Input} from '@angular/core';

/**
 * Generated class for the ImgHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'img-header-component',
  templateUrl: 'img-header.html'
})
export class ImgHeaderComponent {

  @Input() title: string;
  @Input() img: string;

  constructor() {}

}
