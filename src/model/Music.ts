import {Album} from "./Album";
import {Artist} from "./Artist";

export class Music {
  //TODO: adapt class
  title: string;
  album: Album;
  file: string;

  constructor(title: string, file: string, album?: Album, artist?: Artist) {
    this.title = title;
    this.file = file;

    if (album) this.album = album;
    else {
      if (artist) this.album = artist.default_alb;
      else {
        this.album = Album.default;
      }
    }
  }

  static getMusicList(): Array<Music> {
    let trackList = new Array<Music>();
    for (let i=0 ; i<10 ; i++) {
      trackList.push(new Music("Musique", null));
    }
    trackList[1].title="coucou";
    return trackList;
  }
}
