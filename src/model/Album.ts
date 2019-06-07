import {Artist} from "./Artist";
import {DataProvider} from "../providers/data/data";

export class Album {
  //TODO: adapt class
  title: string;
  cover: string;
  artist: Artist;

  //TODO: check if Album.get ok or need to be staticly sotkced in dataProvider
  static default: Album = new Album();

  constructor() {
    this.title = "Album";
    this.cover = "assets/imgs/logo.png";
    this.artist = Artist.default;
  }

  static get (artist: Artist, data: DataProvider, title?: string, cover?: string) : Album {
    if (data.album_list == undefined) {
      data.album_list = new Map<Artist, Array<Album>>();
    }
    if (data.albums == undefined) {
      data.albums = new Array<Album>();
    }

    let albums = data.album_list.get(artist);
    if (albums == null) {
      data.album_list.set(artist, new Array<Album>());
      albums = data.album_list.get(artist);
    }
    let a = albums.filter(a => a.title == title).filter(a => a.artist == artist);
    if (a.length == 0){
      let album = new Album();
      album.artist = artist;
      if (title) album.title = title;
      if (cover) album.cover = cover;
      albums.push(album);
      data.albums.push(album);
      return album;

    } else {
      return a[0];
    }
  }
}
