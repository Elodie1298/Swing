import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaylistListPage } from './playlist-list';

@NgModule({
  declarations: [
    PlaylistListPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaylistListPage),
  ],
})
export class PlaylistListPageModule {}
