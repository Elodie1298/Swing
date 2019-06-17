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
      statusBar.backgroundColorByHexString("#323232");
      screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT)
        .then(e => console.log(e))
        .catch(e => console.log(e));
      splashScreen.hide();
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
