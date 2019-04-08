import {Album} from "./Album";

export class Artist {
  //TODO: adapt class
  name: string;
  img: string;

  constructor() {
    this.name = "Artist test";
    this.img = "assets/imgs/logo.png";
  }

  static getArtistList(): Array<Artist> {
    let artistList = new Array<Artist>();
    for (let i=0 ; i<10 ; i++) {
      artistList.push(new Artist());
    }
    artistList[1].name = "coucou";
    return artistList;
  }
}
