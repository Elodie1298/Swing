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
  duration: number;
  genres: Array<Genre>;
  language: Language;
  id: number;

  constructor() {
    this.genres = new Array<Genre>();
  }

  static get (data: DataProvider, name: string, file: string, album?: Album, album_nb?: number,
              duration?: number, language?: Language, id?: number): Track {
    if (!album) album = Album.default;

    let t= data.tracks.filter(t => (t.name == name && t.album == album));

    if (t.length == 0) {
      let track = new Track();
      track.name = name;
      track.file = file;
      track.album = album;
      if (album_nb) track.album_nb = album_nb;
      if (duration) track.duration = duration;
      if (language) track.language = language;
      if (id) track.id = id;
      data.tracks.push(track);
      return track;
    } else {
      return t[0];
    }
  }
}
