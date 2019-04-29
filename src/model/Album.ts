import {Artist} from "./Artist";

export class Album {
  //TODO: adapt class
  title: string;
  cover: string;
  artist: Artist;

  static default: Album = Album.new(Artist.default);
  static albums: Map<Artist, Array<Album>> = new Map<Artist, Array<Album>>();

  private constructor() {
    this.title = "Album";
    this.cover = "assets/imgs/logo.png";
    this.artist = Artist.default;
  }

  static new (artist: Artist, title?: string, cover?: string) : Album {
    let albums = Album.albums.get(artist);
    if (albums == null) {
      Album.albums.set(artist, new Array<Album>());
      albums = Album.albums.get(artist);
    }
    let a = albums.filter(a => a.title == title).filter(a => a.artist == artist);
    if (a.length == 0){
      let album = new Album();
      album.artist = artist;
      if (title) album.title = title;
      if (cover) album.cover = cover;
      albums.push(album);
      return album

    } else {
      return a[0];
    }
  }

  static getAlbumList(): Array<Album> {
    let albumList = new Array<Album>();
    for (let i=0 ; i<10 ; i++) {
      albumList.push(new Album());
    }
    albumList[1].title = "coucou";
    return albumList;
  }
}
