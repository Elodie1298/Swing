import {Album} from "./Album";
import {DataProvider} from "../providers/data";
import {Genre} from "./Genre";

export class Track {
  //TODO: adapt class
  name: string;
  album: Album;
  file: string;
  album_nb: number;
  duration: number
  genres: Array<Genre>;
  language: string;

  constructor() {
    this.genres = new Array<Genre>();
  }

  static get (data: DataProvider, name: string, file: string, album?: Album): Track {
    if (!album) album = Album.default;

    let m = data.tracks.filter(m => m.name == m.name).filter(m => m.album == album);
    if (m.length == 0) {
      let track = new Track();
      track.name = name;
      track.file = file;
      track.album = album;
      data.tracks.push(track);
      return track;
    } else {
      return m[0];
    }
  }
}
