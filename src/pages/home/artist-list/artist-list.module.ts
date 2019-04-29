import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArtistListPage } from './artist-list';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    ArtistListPage,
  ],
  imports: [
    IonicPageModule.forChild(ArtistListPage),
    ComponentsModule,
  ],
})
export class ArtistListPageModule {}
