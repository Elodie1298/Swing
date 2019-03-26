import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Album} from "../../model/Album";
import {Music} from "../../model/Music";
import {Artist} from "../../model/Artist";
import {Playlist} from "../../model/Playlist";

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  maxLen:number = 3;

  albums: Array<Album>;
  musics: Array<Music>;
  artists: Array<Artist>;
  playlists: Array<Playlist>;

  isPBEnalbed: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initializeItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  initializeItems(): void {
    this.albums = Album.getAlbumList();
    this.musics = Music.getMusicList();
    this.artists = Artist.getArtistList();
    this.playlists = Playlist.getPlaylistList();
  }

  getItems(ev: any) {
    this.initializeItems();
    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.musics = this.musics.filter((item: Music) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      this.artists = this.artists.filter((item: Artist) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      this.albums = this.albums.filter((item: Album) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      this.playlists = this.playlists.filter((item: Playlist) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  getFirstItems(items: Array<any>): Array<any> {
    let array = new Array<any>();
    let max = this.maxLen;
    if (items.length < max) {
      max = items.length;
    }
    for (let i=0 ; i<max ; i++) {
      array.push(items[i])
    }
    return array;
  }

  onClick(ev: any) {
    console.log('clicked');
  }

}
