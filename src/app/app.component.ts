import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/home/tabs/tabs';
import {SqlProvider} from "../providers/sql/sql";
import {FilesManagerProvider} from "../providers/files-manager/files-manager";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private sqlLite: SqlProvider,
              private fm: FilesManagerProvider) {
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
    //TODO: finish with sqlLite or start TypeORM
    // this.sqlLite.initialize();
    this.fm.init();
  }
}
