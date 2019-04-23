import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Music} from "../../../model/Music";
import {FilesManagerProvider} from "../../../providers/files-manager/files-manager";

/**
 * Generated class for the MusicListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-music-list',
  templateUrl: 'music-list.html',
})
export class MusicListPage {

  musics: Array<Music>;

  isPBEnalbed: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fm: FilesManagerProvider) {
    // this.musics = Music.getMusicList();
  }

}
