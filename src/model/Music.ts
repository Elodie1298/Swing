import {Album} from "./Album";
import {DataProvider} from "../providers/data/data";

export class Music {
  //TODO: adapt class
  title: string;
  album: Album;
  file: string;

  constructor() {
    this.title = "Music";
    this.file = "";
  }

  static get (data: DataProvider, title, file, album?: Album): Music {
    if (data.music_list == undefined) {
      data.music_list = new Map<Album, Array<Music>>();
    }
    if (data.musics == undefined) {
      data.musics = new Array<Music>();
    }

    if (!album) album = Album.default;
    let musics = data.music_list.get(album);
    if (musics == null) {
      data.music_list.set(album, new Array<Music>());
      musics = data.music_list.get(album);
    }
    let m = musics.filter(m => m.title == m.title).filter(m => m.album == album);
    if (m.length == 0) {
      let music = new Music();
      music.title = title;
      music.file = file;
      music.album = album;
      musics.push(music);
      data.musics.push(music);
      return music;
    } else {
      return m[0];
    }
  }
}
