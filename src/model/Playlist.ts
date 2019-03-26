import {Track} from "./Track";

export class Playlist {
  trackList: Array<Track>;
  name: string;

  constructor() {
    this.trackList = Track.getTrackList();
    this.name = "Playlist test";
  }

  static getPlaylistList(): Array<Playlist> {
    let playlistList = new Array<Playlist>();
    for (let i=0 ; i<10 ; i++) {
      playlistList.push(new Playlist());
    }
    return playlistList;
  }
}
