import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/home/tabs/tabs';
import {SqlProvider} from "../providers/sql";
import {FilesManagerProvider} from "../providers/files-manager";
import {ScreenOrientation} from "@ionic-native/screen-orientation";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              screenOrientation: ScreenOrientation,
              private sqlLite: SqlProvider,
              private fm: FilesManagerProvider) {
    platform.ready().then(() => {

      // Setting status bar background color
      statusBar.backgroundColorByHexString("#323232");

      //Lock screen orientation to portrait
      screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT)
        .then(e => console.log(e))
        .catch(e => console.log(e));

      // Getting/Setting native storaged data
      storage.set('tracksRoot', "file:///storage/9016-4EF8/");
      storage.set('dirRoot', "Musique");

      // hide splachscreen
      splashScreen.hide();

      // Initialize data
      if (platform.is('cordova')) {
        this.initialize();
      }
    });
  }

  initialize(): void {
    this.sqlLite.initialize();
    this.fm.init();
  }
}
