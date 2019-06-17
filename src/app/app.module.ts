import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { File } from '@ionic-native/file';


import { MyApp } from './app.component';
import {TabsPage} from "../pages/home/tabs/tabs";
import {TrackListPage} from "../pages/home/track-list/track-list";
import {ArtistListPage} from "../pages/home/artist-list/artist-list";
import {PlaylistListPage} from "../pages/home/playlist-list/playlist-list";
import {ComponentsModule} from "../components/components.module";
import {SearchPage} from "../pages/home/search/search";
import {PlayingListPage} from "../pages/playing-list/playing-list";
import {ArtistPage} from "../pages/artist/artist";
import {AlbumPage} from "../pages/album/album";
import {PlaylistPage} from "../pages/playlist/playlist";
import {MoreListsPage} from "../pages/more-lists/more-lists";
import {SQLite} from "@ionic-native/sqlite";
import {SqlProvider} from "../providers/sql";
import { FilesManagerProvider } from '../providers/files-manager';
import { DataProvider } from '../providers/data';
import { MusicProvider } from '../providers/music';
import {Media} from "@ionic-native/media";
import { MetadataProvider } from '../providers/metadata';
import {HttpClientModule} from "@angular/common/http";
import { ExtractId3Provider } from '../providers/extract-id3';
import {ScreenOrientation} from "@ionic-native/screen-orientation";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    TrackListPage,
    ArtistListPage,
    PlaylistListPage,
    SearchPage,
    PlayingListPage,
    ArtistPage,
    AlbumPage,
    PlaylistPage,
    MoreListsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true
    }),
    ComponentsModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    TrackListPage,
    ArtistListPage,
    PlaylistListPage,
    SearchPage,
    PlayingListPage,
    ArtistPage,
    AlbumPage,
    PlaylistPage,
    MoreListsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    SqlProvider,
    FilesManagerProvider,
    File,
    DataProvider,
    MusicProvider,
    Media,
    MetadataProvider,
    ExtractId3Provider,
    BackgroundMode
  ]
})
export class AppModule {}
