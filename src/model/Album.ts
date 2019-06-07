import {Artist} from "./Artist";

export class Album {
  //TODO: adapt class
  title: string;
  cover: string;
  artist: Artist;

  static default: Album = Album.new(Artist.default);
  static albums: Array<Album> = new Array<Album>();
  static album_list: Map<Artist, Array<Album>> = new Map<Artist, Array<Album>>();

  private constructor() {
    this.title = "Album";
    this.cover = "assets/imgs/logo.png";
    this.artist = Artist.default;
  }

  static new (artist: Artist, title?: string, cover?: string) : Album {
    if (Album.album_list == undefined) {
      Album.album_list = new Map<Artist, Array<Album>>();
    }
    if (Album.albums == undefined) {
      Album.albums = new Array<Album>();
    }

    let albums = Album.album_list.get(artist);
    if (albums == null) {
      Album.album_list.set(artist, new Array<Album>());
      albums = Album.album_list.get(artist);
    }
    let a = albums.filter(a => a.title == title).filter(a => a.artist == artist);
    if (a.length == 0){
      let album = new Album();
      album.artist = artist;
      if (title) album.title = title;
      if (cover) album.cover = cover;
      albums.push(album);
      Album.albums.push(album);
      return album;

    } else {
      return a[0];
    }
  }
}
