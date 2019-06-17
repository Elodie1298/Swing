import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/home/tabs/tabs';
import {SqlProvider} from "../providers/sql";
import {FilesManagerProvider} from "../providers/files-manager";
import {ScreenOrientation} from "@ionic-native/screen-orientation";
import {Storage} from "@ionic/storage";
import {File} from "@ionic-native/file";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              screenOrientation: ScreenOrientation,
              storage: Storage,
              file: File,
              private sql: SqlProvider,
              private fm: FilesManagerProvider) {
    platform.ready().then(() => {
      statusBar.backgroundColorByHexString("#323232");
      screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT)
        .then(e => console.log(e))
        .catch(e => console.log(e));
      storage.set('tracksRoot', "file:///storage/9016-4EF8/")
      storage.set('dirRoot', "Musique");
      // storage.set('trackRoot', file.externalRootDirectory)
      //   .then(d => console.log(d));
      // // storage.set('dirRoot', 'Music');
      // storage.set('dirRoot', '');
      splashScreen.hide();
      if (platform.is('cordova')) {
        this.initialize();
      }
    });
  }

  initialize(): void {
    this.sql.initialize();
    this.fm.init()
      .then((loadMetadata: any) => {
        console.log('Metadata loaded');
        return this.sql.saveAll();
      })
      .then();
  }
}
