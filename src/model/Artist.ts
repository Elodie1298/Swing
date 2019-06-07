import {Album} from "./Album";

export class Artist {
  //TODO: adapt class
  name: string;
  img: string;
  default_alb: Album;

  static default: Artist = Artist.new("Artist");
  static artists: Array<Artist> = new Array<Artist>();

  private constructor() {
    this.name = "Artist";
    this.img = "assets/imgs/logo.png";
    this.default_alb = Album.new(this);
  }

  static new (name: string, img?: string): Artist {
    if (Artist.artists == undefined) {
      Artist.artists = new Array<Artist>();
    }
    let artists = Artist.artists.filter(a => a.name == name);
    if (artists.length==0) {
      let artist = new Artist();
      artist.name = name;
      if (img) artist.img = img;
      Artist.artists.push(artist);
      return artist;
    } else {
      return artists[0];
    }
  }
}
