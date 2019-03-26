import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {TabsPage} from "../pages/tabs/tabs";
import {MusicListPage} from "../pages/music-list/music-list";
import {ArtistListPage} from "../pages/artist-list/artist-list";
import {PlaylistListPage} from "../pages/playlist-list/playlist-list";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    MusicListPage,
    ArtistListPage,
    PlaylistListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    MusicListPage,
    ArtistListPage,
    PlaylistListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
