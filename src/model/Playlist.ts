import {Music} from "./Music";
import {DataProvider} from "../providers/data/data";

export class Playlist {
  //TODO: adapt class
  trackList: Array<Music>;
  name: string;
  cover: string;
  description: string;

  constructor() {
    this.trackList = new Array<Music>();
    this.name = "Playlist test";
    this.cover = "assets/imgs/logo.png";
  }

  static get (data: DataProvider, name: string, cover?: string): Playlist {
    if (data.playlists == undefined) {
      data.playlists = new Array<Playlist>();
    }

    let p = data.playlists.filter(p => p.name = name);
    if (p.length == 0) {
      let playlist = new Playlist();
      playlist.name = name;
      if (cover) playlist.cover = cover;
      data.playlists.push(playlist);
      return playlist;
    } else {
      return p[0];
    }
  }
}
