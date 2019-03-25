import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Music} from "../../model/Music";

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

  //TODO: ajouter les labels de listes

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.musics = Music.getMusicList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MusicListPage');
  }

}
