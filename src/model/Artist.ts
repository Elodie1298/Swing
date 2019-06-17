import {DataProvider} from "../providers/data";

export class Artist {
  //TODO: adapt class
  name: string;
  img: string;
  id: number;

  static default: Artist = new Artist();

  constructor() {
    this.name = "Artist Inconnu";
    this.img = "assets/imgs/logo.png";
  }

  static get (name: string, data: DataProvider, img?: string, id?: number): Artist {
    let artists = data.artists.filter(a => a.name == name);
    if (artists.length==0) {
      let artist = new Artist();
      artist.name = name;
      if (img) artist.img = img;
      if (id) artist.id = id;
      data.artists.push(artist);
      return artist;
    } else {
      return artists[0];
    }
  }
}
