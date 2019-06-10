import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/home/tabs/tabs';
import {FilesManagerProvider} from "../providers/files-manager/files-manager";
import {createConnection} from "typeorm";
import {Album} from "../model/orm data/album";
import {Artist} from "../model/orm data/artist";
import {Genre} from "../model/orm data/genre";
import {Label} from "../model/orm data/label";
import {Track} from "../model/orm data/track";
import {Playlist} from "../model/orm data/playlist";
import {DataProvider} from "../providers/data/data";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private fm: FilesManagerProvider,
              private data: DataProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      if (platform.is('cordova')) {
        this.initialize();
      }
    });
  }

  initialize(): void {
    createConnection({
      type: "cordova",
      database: 'jaz.db',
      location: 'default',
      synchronize: true,
      entities: [
        Album,
        Artist,
        Track,
        Playlist,
        Genre,
        Label
      ]
    })
      .then(connection => {
        this.data.localConnection = connection;
        this.fm.init();
      })
      .catch(e => console.log(e));
  }
}
