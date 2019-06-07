import {Album} from "./Album";

export class Music {
  //TODO: adapt class
  title: string;
  album: Album;
  file: string;

  static musics: Array<Music> = new Array<Music>();
  static music_list: Map<Album, Array<Music>> = new Map<Album, Array<Music>>();

  constructor() {
    this.title = "Music";
    this.file = "";
  }

  static new (title, file, album?: Album): Music {
    if (Music.music_list == undefined) {
      Music.music_list = new Map<Album, Array<Music>>();
    }
    if (Music.musics == undefined) {
      Music.musics = new Array<Music>();
    }

    if (!album) album = Album.default;
    let musics = Music.music_list.get(album);
    if (musics == null) {
      Music.music_list.set(album, new Array<Music>());
      musics = Music.music_list.get(album);
    }
    let m = musics.filter(m => m.title == m.title).filter(m => m.album == album);
    if (m.length == 0) {
      let music = new Music();
      music.title = title;
      music.file = file;
      music.album = album;
      musics.push(music);
      Music.musics.push(music);
      return music;
    } else {
      return m[0];
    }
  }
}
