import {Album} from "./Album";

export class Music {
  //TODO: adapt class
  title: string;
  album: Album;
  file: string;

  constructor() {
    this.title = "Music test";
    this.album = new Album();
  }

  static getMusicList(): Array<Music> {
    let trackList = new Array<Music>();
    for (let i=0 ; i<10 ; i++) {
      trackList.push(new Music());
    }
    trackList[1].title="coucou";
    return trackList;
  }
}
