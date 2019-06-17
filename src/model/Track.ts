import {Album} from "./Album";
import {DataProvider} from "../providers/data";
import {Genre} from "./Genre";
import {Language} from "./Language";

export class Track {
  //TODO: adapt class
  name: string;
  album: Album;
  file: string;
  album_nb: number;
  duration: number
  genres: Array<Genre>;
  language: Language;

  constructor() {
    this.genres = new Array<Genre>();
  }

  static get (data: DataProvider, name: string, file: string, album?: Album,
              album_nb?: number, duration?: number, language?: Language): Track {
    if (!album) album = Album.default;

    let m = data.tracks.filter(m => m.name == name).filter(m => m.album == album);
    if (m.length == 0) {
      let track = new Track();
      track.name = name;
      track.file = file;
      track.album = album;
      if (album_nb) track.album_nb = album_nb;
      if (duration) track.duration = duration;
      if (language) track.language = language;
      data.tracks.push(track);
      return track;
    } else {
      return m[0];
    }
  }
}
