import {Music} from "./Music";

export class Playlist {
  //TODO: adapt class
  trackList: Array<Music>;
  name: string;
  cover: string;

  constructor() {
    this.trackList = Music.getMusicList();
    this.name = "Playlist test";
    this.cover = "assets/imgs/logo.png";
  }

  static getPlaylistList(): Array<Playlist> {
    let playlistList = new Array<Playlist>();
    for (let i=0 ; i<10 ; i++) {
      playlistList.push(new Playlist());
    }
    return playlistList;
  }
}
