import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {TabsPage} from "../pages/tabs/tabs";
import {MusicListPage} from "../pages/music-list/music-list";
import {ArtistListPage} from "../pages/artist-list/artist-list";
import {PlaylistListPage} from "../pages/playlist-list/playlist-list";
import {ComponentsModule} from "../components/components.module";
import {SearchPage} from "../pages/search/search";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    MusicListPage,
    ArtistListPage,
    PlaylistListPage,
    SearchPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    MusicListPage,
    ArtistListPage,
    PlaylistListPage,
    SearchPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
