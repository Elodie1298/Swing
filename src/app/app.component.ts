import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/home/tabs/tabs';
import {FilesManagerProvider} from "../providers/files-manager/files-manager";
import {createConnection} from "typeorm";
import {Album} from "../model/album";
import {Artist} from "../model/artist";
import {Genre} from "../model/genre";
import {Label} from "../model/label";
import {Track} from "../model/track";
import {Playlist} from "../model/playlist";
import {DataProvider} from "../providers/data/data";
import {ScreenOrientation} from "@ionic-native/screen-orientation";
import {Storage} from "@ionic/storage";
import {MetadataProvider} from "../providers/metadata/metadata";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              screenOrientation: ScreenOrientation,
              fm: FilesManagerProvider,
              data: DataProvider,
              metadata: MetadataProvider,
              storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      statusBar.backgroundColorByHexString("#323232");
      screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT)
        .then(e => console.log(e))
        .catch(e => console.log(e));
      createConnection({
        type: "sqlite",
        database: 'jaz.db',
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
          return data.setConnection(connection)})
        .then(() => {
          splashScreen.hide();

          return storage.get('filesLoaded');
        })
        .then(answer => {
          if (answer==null || answer==false) {
            console.log('loading files...');
            fm.init();
          } else {
            console.log('files already logged');
          }
        })
        .catch(e => console.log(e));
    });
  }
}
