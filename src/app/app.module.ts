import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { File } from '@ionic-native/file';


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
import {PlaylistPage} from "../pages/playlist/playlist";
import {MoreListsPage} from "../pages/more-lists/more-lists";
import {SQLite} from "@ionic-native/sqlite";
import {SqlProvider} from "../providers/sql/sql";
import { FilesManagerProvider } from '../providers/files-manager/files-manager';
import { DataProvider } from '../providers/data/data';
import { MusicProvider } from '../providers/music/music';
import {Media} from "@ionic-native/media";
import {MusicMorePopoverComponent} from "../components/lists/musics/music-more-popover/music-more-popover";
import { MetadataProvider } from '../providers/metadata/metadata';
import {HttpClientModule} from "@angular/common/http";

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
    MusicListPage,
    ArtistListPage,
    PlaylistListPage,
    SearchPage,
    PlayingListPage,
    ArtistPage,
    AlbumPage,
    PlaylistPage,
    MoreListsPage,
    MusicMorePopoverComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    SqlProvider,
    FilesManagerProvider,
    File,
    DataProvider,
    MusicProvider,
    Media,
    MetadataProvider,
  ]
})
export class AppModule {}
