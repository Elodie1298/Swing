import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoreListsPage } from './more-lists';

@NgModule({
  declarations: [
    MoreListsPage,
  ],
  imports: [
    IonicPageModule.forChild(MoreListsPage),
  ],
})
export class MoreListsPageModule {}
