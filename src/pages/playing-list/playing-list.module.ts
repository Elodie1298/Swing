import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayingListPage } from './playing-list';

@NgModule({
  declarations: [
    PlayingListPage,
  ],
  imports: [
    IonicPageModule.forChild(PlayingListPage),
  ],
})
export class PlayingListPageModule {}
