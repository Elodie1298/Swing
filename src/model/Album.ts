import {Artist} from "./Artist";

export class Album {
  //TODO: adapt class
  title: string;
  cover: string;
  artist: Artist;

  constructor() {
    this.title = "Album test";
    this.cover = "assets/imgs/logo.png";
    this.artist = new Artist();
  }

  static getAlbumList(): Array<Album> {
    let albumList = new Array<Album>();
    for (let i=0 ; i<10 ; i++) {
      albumList.push(new Album());
    }
    return albumList;
  }
}
