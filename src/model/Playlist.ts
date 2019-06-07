import {Music} from "./Music";

export class Playlist {
  //TODO: adapt class
  trackList: Array<Music>;
  name: string;
  cover: string;

  static playlists: Array<Playlist> = new Array<Playlist>();

  static playingList: Array<Music>;

  private constructor() {
    this.trackList = new Array<Music>();
    this.name = "Playlist test";
    this.cover = "assets/imgs/logo.png";
  }

  static new (name: string, cover?: string): Playlist {
    if (Playlist.playlists == undefined) {
      Playlist.playlists = new Array<Playlist>();
    }

    let p = Playlist.playlists.filter(p => p.name = name);
    if (p.length == 0) {
      let playlist = new Playlist();
      playlist.name = name;
      if (cover) playlist.cover = cover;
      Playlist.playlists.push(playlist);
      return playlist;
    } else {
      return p[0];
    }
  }
}
