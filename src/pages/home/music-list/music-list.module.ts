import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MusicListPage } from './music-list';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    MusicListPage,
  ],
  imports: [
    IonicPageModule.forChild(MusicListPage),
    ComponentsModule,
  ],
})
export class MusicListPageModule {}
