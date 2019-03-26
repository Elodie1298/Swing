export class Artist {
  name: string;
  img: string;

  constructor() {
    this.name = "Artist test";
    this.img = "assets/imgs/logo.png";
  }

  static getArtists(): Array<Artist> {
    let artistList = new Array<Artist>();
    for (let i=0 ; i<10 ; i++) {
      artistList.push(new Artist());
    }
    return artistList;
  }
}
