import { Injectable } from '@angular/core';
import {DbTransaction, SQLite, SQLiteObject} from "@ionic-native/sqlite";
import {DataProvider} from "./data";

@Injectable()
export class SqlProvider {
  dataBase: SQLiteObject;

  constructor(private sqlite: SQLite,
              private data: DataProvider) {}

  initialize(): void {
    this.sqlite.create({
      name: 'jaz.db',
      location: 'default',
    })
      .then(async (db: SQLiteObject) => {
        this.dataBase = db;

        await this.dataBase.executeSql('drop table if exists tracks', []);
        await this.dataBase.executeSql('drop table if exists albums', []);
        await this.dataBase.executeSql('drop table if exists artists', []);
        await this.dataBase.executeSql('drop table if exists playlists', []);
        await this.dataBase.executeSql('drop table if exists track_genre', []);
        await this.dataBase.executeSql('drop table if exists album_artist', []);
        await this.dataBase.executeSql('drop table if exists album_label', []);
        await this.dataBase.executeSql('drop table if exists playlist_track', []);
        await this.dataBase.executeSql('create table if not exists tracks(' +
          'track_name text,' +
          'track_file text,' +
          'track_album text,' +
          'track_album_nb integer,' +
          'track_duration integer,' +
          'track_language text,' +
          'constraint track_pk primary key (track_name, track_album)' +
          ')', [])
          .catch(err => console.log(err));
        await this.dataBase.executeSql('create table if not exists albums(' +
          'album_name text,' +
          'album_cover text,' +
          'album_artist  text,' +
          'album_year integer,' +
          'constraint album_pk primary key (album_name, album_artist)' +
          ')', [])
          .catch(err => console.log(err));
        await this.dataBase.executeSql('create table if not exists artists(' +
          'artist_name text primary key,' +
          'artist_img text' +
          ')', [])
          .catch(err => console.log(err));
        await this.dataBase.executeSql('create table if not exists playlists(' +
          'playlist_name text primary key,' +
          'playlist_cover text,' +
          'playlist_description  text' +
          ')', [])
          .catch(err => console.log(err));
        await this.dataBase.executeSql('create table if not exists track_genre(' +
          'track_name text,' +
          'genre_name text,' +
          'constraint tg primary key (track_name, genre_name)' +
          ')', [])
          .catch(err => console.log(err));
        await this.dataBase.executeSql('create table if not exists album_artist(' +
          'album_name text,' +
          'artist_name text,' +
          'constraint aa primary key (album_name, artist_name)' +
          ')', [])
          .catch(err => console.log(err));
        await this.dataBase.executeSql('create table if not exists album_label(' +
          'album_name text,' +
          'label_name text,' +
          'constraint al primary key (album_name, label_name)' +
          ')', [])
          .catch(err => console.log(err));
        await this.dataBase.executeSql('create table if not exists playlist_track(' +
          'playlist_name text,' +
          'track_name text,' +
          'constraint pt primary key (playlist_name, track_name)' +
          ')', [])
          .catch(err => console.log(err));
  })
      .catch(err => console.log(err));
  }

  async saveAll(): Promise<any> {
    await this.dataBase.transaction((tx: DbTransaction) => {
      for (let artist of this.data.artists) {
        console.log('insert artist', artist.name);
        tx.executeSql('insert into artists(artist_name, artist_img) values (?, ?)',
          [artist.name, artist.img]);
      }
      for (let playlist of this.data.playlists) {
        console.log('insert playlist', playlist.name);
        tx.executeSql('insert into playlists(playlist_name, playlist_cover, playlist_description) values (?, ?, ?)',
          [playlist.name, playlist.cover, playlist.description]);
      }
    });
    await this.dataBase.transaction((tx: DbTransaction) => {
      for (let album of this.data.albums) {
        console.log('insert album', album.name);
        tx.executeSql('insert into albums(album_name, album_cover, album_artist, album_year) values (?, ?, ?, ?)',
          [
            album.name,
            album.cover,
            (album.artist)? album.artist.name: null,
            album.year
          ]);
      }
    });
    await this.dataBase.transaction((tx: DbTransaction) => {
      for (let track of this.data.tracks) {
        console.log('insert track', track.name);
        tx.executeSql('insert into tracks(track_name, track_file, track_album, track_album_nb, track_duration, track_language)' +
          ' values (?, ?, ?, ?, ?, ?)',
          [
            track.name,
            track.file,
            (track.album)?track.album.name: null,
            track.album_nb,
            track.duration,
            (track.language)?track.language.name: null
          ]);
      }
      for (let album of this.data.albums) {
        for (let artist of album.artists) {
          console.log('insert album artists', album.name, artist.name);
          tx.executeSql('insert into album_artist(album_name, artist_name) values (?, ?)',
            [album.name, artist.name]);
        }
        for (let label of album.labels) {
          console.log('insert album label', album.name, label.name);
          tx.executeSql('insert into album_label(album_name, label_name) values (?, ?)',
            [album.name, label.name]);
        }
      }
    });
    await this.dataBase.transaction((tx: DbTransaction) => {
          for (let track of this.data.tracks) {
            for (let genre of track.genres) {
              console.log('insert track genre', track.name, genre.name);
              tx.executeSql('insert into track_genre(track_name, genre_name) values (?, ?)',
                [track.name, genre.name]);
            }
            for (let playlist of this.data.playlists) {
                  if (playlist.trackList.indexOf(track)>-1) {
                    console.log('insert playlist track', playlist.name, track.name);
                    tx.executeSql('insert into playlist_track(track_name, playlist_name) values (?, ?)',
                      [track.name, playlist.name]);
                  }
            }
          }
    });
    return new Promise<any>((resolve) => resolve(true));
  }

  // getAll(): void {
  //   this.dataBase.transaction((tx: DbTransaction) => {
  //     tx.executeSql('select * from artists', []);
  //   })
  //     .then((res: any) => {
  //       let item;
  //       for (let i=0; i<res.length; i++) {
  //         item = res.rows.item(i);
  //         Artist.get(item.artist_name, this.data, item.artist_img, item.artist_name);
  //       }
  //       return this.dataBase.transaction((tx: DbTransaction) => {
  //         tx.executeSql('select * from albums', []);
  //       })
  //     })
  //     .then((res: any) => {
  //       let item;
  //       for (let i=0; i<res.length; i++) {
  //         item = res.rows.item(i);
  //         let artist = this.data.artists.filter(a => a.name == item.album_artist)[0];
  //         Album.get(artist, this.data, item.album_name, item.album_cover, item.album_year, item.album_name);
  //       }
  //       return this.dataBase.transaction((tx: DbTransaction) => {
  //         tx.executeSql('select * from tracks', []);
  //       })
  //     })
  //     .then((res: any) => {
  //       let item;
  //       for (let i=0; i<res.length; i++) {
  //         item = res.rows.item(i);
  //         let album = this.data.albums.filter(a => a.name == item.track_album)[0];
  //         let language = Language.get(item.track_language, this.data);
  //         Track.get(this.data, item.track_name, item.track_file, album, item.album_nb,
  //           item.track_duration, language, item.track_name);
  //       }
  //       return this.dataBase.transaction((tx: DbTransaction) => {
  //         tx.executeSql('select * from playlists', []);
  //       })
  //     })
  //     .then((res: any) => {
  //       let item;
  //       for (let i=0; i<res.length; i++) {
  //         item = res.rows.item(i);
  //         Playlist.get(this.data, item.playlist_name, item.playlist_cover,
  //           item.playlist_name, item.playlist_description);
  //       }
  //       return this.dataBase.transaction((tx: DbTransaction) => {
  //         tx.executeSql('select * from track_genre', []);
  //       })
  //     })
  //     .then((res: any) => {
  //       let item;
  //       for (let i=0; i<res.length; i++) {
  //         item = res.rows.item(i);
  //         let track = this.data.tracks.filter(t => t.name == item.track_name)[0];
  //         let genre = Genre.get(item.genre_name, this.data);
  //         track.genres.push(genre);
  //       }
  //       return this.dataBase.transaction((tx: DbTransaction) => {
  //         tx.executeSql('select * from album_artist', []);
  //       })
  //     })
  //     .then((res: any) => {
  //       let item;
  //       for (let i=0; i<res.length; i++) {
  //         item = res.rows.item(i);
  //         let album = this.data.albums.filter(a => a.name == item.album_name)[0];
  //         let artist = this.data.artists.filter(a => a.name == item.artist_name)[0];
  //         album.artists.push(artist);
  //       }
  //       return this.dataBase.transaction((tx: DbTransaction) => {
  //         tx.executeSql('select * from album_label', []);
  //       })
  //     })
  //     .then((res: any) => {
  //       let item;
  //       for (let i=0; i<res.length; i++) {
  //         item = res.rows.item(i);
  //         let album = this.data.albums.filter(a => a.name == item.album_name)[0];
  //         let label = Label.get(item.label_name, this.data);
  //         album.labels.push(label);
  //       }
  //       return this.dataBase.transaction((tx: DbTransaction) => {
  //         tx.executeSql('select * from playlist_track', []);
  //       })
  //     })
  //     .then((res: any) => {
  //       let item;
  //       for (let i=0; i<res.length; i++) {
  //         item = res.rows.item(i);
  //         let playlist = this.data.playlists.filter(p => p.name == item.playlist_name)[0];
  //         let track = this.data.tracks.filter(t => t.name == item.track_name)[0];
  //         playlist.trackList.push(track);
  //       }
  //     })
  //     .catch(e => console.log(e));
  // }
}
