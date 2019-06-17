import {Track} from "./Track";
import {DataProvider} from "../providers/data";

export class Playlist {
  //TODO: adapt class
  trackList: Array<Track>;
  name: string;
  cover: string;
  description: string;

  constructor() {
    this.trackList = new Array<Track>();
    this.name = "Playlist test";
    this.cover = "assets/imgs/logo.png";
  }

  static get (data: DataProvider, name: string, cover?: string,
              description?: string): Playlist {

    let p = data.playlists.filter(p => p.name = name);
    if (p.length == 0) {
      let playlist = new Playlist();
      playlist.name = name;
      if (cover) playlist.cover = cover;
      if (description) playlist.description = description;
      data.playlists.push(playlist);
      return playlist;
    } else {
      return p[0];
    }
  }
}
