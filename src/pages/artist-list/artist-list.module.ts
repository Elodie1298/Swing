import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArtistListPage } from './artist-list';

@NgModule({
  declarations: [
    ArtistListPage,
  ],
  imports: [
    IonicPageModule.forChild(ArtistListPage),
  ],
})
export class ArtistListPageModule {}
