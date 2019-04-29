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
  }

  static new (name: string, img?: string): Artist {
    let artists = Artist.artists.filter(a => a.name == name);
    if (artists.length == 0) {
      let artist = new Artist();
      if (img) artist.img = img;

      return artist;
    } else {
      return artists[0];
    }
  }

  //TODO : delete
  static getArtistList(): Array<Artist> {
    let artistList = new Array<Artist>();
    for (let i=0 ; i<10 ; i++) {
      artistList.push(new Artist());
    }
    artistList[1].name = "coucou";
    return artistList;
  }

}
