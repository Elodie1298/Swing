import {Artist} from "./Artist";
import {DataProvider} from "../providers/data";
import {Label} from "./Label";

export class Album {
  //TODO: adapt class
  name: string;
  cover: string;
  artist: Artist;
  artists: Array<Artist>;
  year: number;
  labels: Array<Label>;

  //TODO: check if Album.get ok or need to be staticly sotkced in dataProvider
  static default: Album = new Album();

  constructor() {
    this.name = "Album";
    this.cover = "assets/imgs/logo.png";
    this.artist = Artist.default;
    this.artists = new Array<Artist>();
    this.labels = new Array<Label>();
  }

  static get (artist: Artist, data: DataProvider, name?: string,
              cover?: string, year?: number) : Album {
    let a = data.albums.filter(a => a.name == name).filter(a => a.artist == artist);
    if (a.length == 0){
      let album = new Album();
      album.artist = artist;
      if (name) album.name = name;
      if (cover) album.cover = cover;
      if (year) album.year = year;
      data.albums.push(album);
      return album;

    } else {
      return a[0];
    }
  }
}
