import {Album} from "./Album";
import {DataProvider} from "../providers/data";

export class Artist {
  //TODO: adapt class
  name: string;
  img: string;
  default_alb: Album;

  static default: Artist = new Artist();

  constructor() {
    this.name = "Artist";
    this.img = "assets/imgs/logo.png";
  }

  static get (name: string, data: DataProvider, img?: string): Artist {
    let artists = data.artists.filter(a => a.name == name);
    if (artists.length==0) {
      let artist = new Artist();
      artist.name = name;
      if (img) artist.img = img;
      data.artists.push(artist);
      return artist;
    } else {
      return artists[0];
    }
  }
}
