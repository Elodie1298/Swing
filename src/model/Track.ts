import {Album} from "./Album";

export class Track {
  title: string;
  album: Album;

  constructor() {
    this.title = "Track test";
    this.album = new Album();
  }

  static getTrackList(): Array<Track> {
    let trackList = new Array<Track>();
    for (let i=0 ; i<10 ; i++) {
      trackList.push(new Track());
    }
    return trackList;
  }
}
