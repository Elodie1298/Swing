import {Component, Input} from '@angular/core';

@Component({
  selector: 'img-header-component',
  templateUrl: 'img-header.html'
})
export class ImgHeaderComponent {

  @Input() title: string;
  @Input() img: string;

  constructor() {}

}
