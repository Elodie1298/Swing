import {Album} from "./Album";

export class Music {
  title: string;
  album: Album;

  constructor() {
    this.title = "Music test";
    this.album = new Album();
  }

  static getMusicList(): Array<Music> {
    let musicList = new Array<Music>();
    for (let i=0 ; i<10 ; i++) {
      musicList.push(new Music());
    }
    return musicList;
  }
}
