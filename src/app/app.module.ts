import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {TabsPage} from "../pages/home/tabs/tabs";
import {MusicListPage} from "../pages/home/music-list/music-list";
import {ArtistListPage} from "../pages/home/artist-list/artist-list";
import {PlaylistListPage} from "../pages/home/playlist-list/playlist-list";
import {ComponentsModule} from "../components/components.module";
import {SearchPage} from "../pages/home/search/search";
import {PlayingListPage} from "../pages/playing-list/playing-list";
import {ArtistPage} from "../pages/artist/artist";
import {AlbumPage} from "../pages/album/album";
import {Playlist} from "../model/Playlist";
import {PlaylistPage} from "../pages/playlist/playlist";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    MusicListPage,
    ArtistListPage,
    PlaylistListPage,
    SearchPage,
    PlayingListPage,
    ArtistPage,
    AlbumPage,
    PlaylistPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true
    }),
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    MusicListPage,
    ArtistListPage,
    PlaylistListPage,
    SearchPage,
    PlayingListPage,
    ArtistPage,
    AlbumPage,
    PlaylistPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
