import { Injectable } from '@angular/core';
import {DbTransaction, SQLite, SQLiteObject} from "@ionic-native/sqlite";
import {DataProvider} from "./data";
import {Artist} from "../model/Artist";
import {Album} from "../model/Album";
import {Track} from "../model/Track";
import {Language} from "../model/Language";
import {Playlist} from "../model/Playlist";
import {Genre} from "../model/Genre";
import {Label} from "../model/Label";

@Injectable()
export class SqlProvider {
  dataBase: SQLiteObject;

  constructor(private sqlite: SQLite,
              private data: DataProvider) {}

  initialize(): void {
    this.sqlite.create({
      name: 'jaz.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.dataBase = db;
        console.log('database created', this.dataBase);

        return this.dataBase.transaction(tx => {
          tx.executeSql('drop table if exists tracks', []); //TODO: remove after tests ok
          tx.executeSql('create table if not exists tracks(' +
            'track_id integer primary key autoincrement,' +
            'track_name text,' +
            'track_file text,' +
            'track_album  integer,' +
            'track_album_nb integer,' +
            'track_duration integer,' +
            'track_language text' +
            ')', []);
          tx.executeSql('create table if not exists albums(' +
            'album_id integer primary key autoincrement,' +
            'album_name text,' +
            'album_cover text,' +
            'album_artist  integer,' +
            'album_year integer' +
            ')', []);
          tx.executeSql('create table if not exists artist(' +
            'artist_id integer primary key autoincrement,' +
            'artist_name text,' +
            'artist_img text' +
            ')', []);
          tx.executeSql('create table if not exists playlists(' +
            'playlist_id integer primary key autoincrement,' +
            'playlist_name text,' +
            'playlist_cover text,' +
            'playlist_description  text' +
            ')', []);
          tx.executeSql('create table if not exists track_genre(' +
            'track_id integer primary key,' +
            'genre_id text primary key' +
            ')', []);
          tx.executeSql('create table if not exists album_artist(' +
            'album_id integer primary key,' +
            'artist_id integer primary key' +
            ')', []);
          tx.executeSql('create table if not exists album_label(' +
            'album_id integer primary key,' +
            'label_id text primary key' +
            ')', []);
          tx.executeSql('create table if not exists playlist_track(' +
            'playlist_id integer primary key,' +
            'track_id integer primary key' +
            ')', []);

          //TODO: delete following lines
          tx.executeSql('insert into tracks(track_name) values (?)', ['Test']);
          tx.executeSql('insert into tracks(track_name) values (?)', ['Test2']);
        })
      })
      .then(() => {
        this.dataBase.executeSql('select * from tracks', [])
          .then(res => {console.log(res.rows.item(1))})
          .catch(e => console.log(e));
      })
      .catch(err => console.log(err));
  }

  saveAll(): Promise<any> {
    return this.dataBase.transaction((tx: DbTransaction) => {
      for (let artist of this.data.artists) {
        tx.executeSql('insert into artists(artist_name, artist_img) values (?, ?)',
          [artist.name, artist.img]);
      }
      for (let playlist of this.data.playlists) {
        tx.executeSql('insert into playlists(playlist_name, playlist_cover, playlist_description) values (?, ?, ?)',
          [playlist.name, playlist.cover, playlist.description]);
      }
    })
      .then(() => {
        return this.dataBase.transaction((tx: DbTransaction) => {
          for (let album of this.data.albums) {
            this.dataBase.transaction((txArtist: DbTransaction) => {
              txArtist.executeSql('select * from artists where artist_name = ?', [album.artist.name]);
            })
              .then((res: any) => {
                let artist_id = res.rows.item(0).artist_id;
                tx.executeSql('insert into albums(album_name, album_cover, album_artist, album_year) values (?, ?, ?, ?)',
                  [album.name, album.cover, artist_id, album.year]);
              })
              .catch(e => console.log(e));
          }
        })
      })
      .then(() => {
        return this.dataBase.transaction((tx: DbTransaction) => {
          for (let track of this.data.tracks) {
            this.dataBase.transaction((txAlbum: DbTransaction) => {
              this.dataBase.transaction((txArtist: DbTransaction) => {
                txArtist.executeSql('select * from artists where artist_name = ?', [track.album.artist.name]);
              })
                .then((res: any) => {
                  let artist_id = res.rows.item(0).artist_id;
                  txAlbum.executeSql('select * from albums where album_name = ? and album_artist = ?',
                    [track.album.name, artist_id])
                })
            })
              .then((res: any) => {
                let album_id = res.rows.item(0).album_id;
                tx.executeSql('insert into tracks(track_name, track_file, track_album, track_album_nb, track_duration, track_language)' +
                  ' values (?, ?, ?, ?, ?, ?)',
                  [track.name, track.file, album_id, track.album_nb, track.duration, track.language.name]);
              })
          }
          for (let album of this.data.albums) {
            this.dataBase.transaction((txAlbum: DbTransaction) => {
              this.dataBase.transaction((txArtist: DbTransaction) => {
                txArtist.executeSql('select * from artists where artist_name = ?', [album.artist.name]);
              })
                .then((res: any) => {
                  let artist_id = res.rows.item(0).artist_id;
                  txAlbum.executeSql('select * from albums where album_name = ? and album_artist = ?', [album.name, artist_id]);
                })
                .catch(e => console.log(e));
            })
              .then((res: any) => {
                let album_id = res.rows.item(0).album_id;
                for (let label of album.labels) {
                  tx.executeSql('insert into album_label(album_id, label_id) values (?, ?)', [album_id, label]);
                }
                for (let artist of album.artists) {
                  this.dataBase.transaction((txArtist: DbTransaction) => {
                    txArtist.executeSql('select * from artists where artist_name = ?', [album.artist.name]);
                  })
                    .then((res: any) => {
                      let artist_id = res.rows.item(0).artist_id;
                      tx.executeSql('insert into album_artist(album_id, artist_id) values (?, ?)', [album_id, artist_id]);
                    })
                    .catch(e => console.log(e));
                }
              })
              .catch(e => console.log(e));
          }
        }
        )
      })
      .then(() => {
        return this.dataBase.transaction((tx: DbTransaction) => {
          for (let track of this.data.tracks) {
            this.dataBase.transaction((txAlbum: DbTransaction) => {
              this.dataBase.transaction((txArtist: DbTransaction) => {
                txArtist.executeSql('select * from artists where artist_name = ?', [track.album.artist.name]);
              })
                .then((res: any) => {
                  let artist_id = res.rows.item(0).artist_id;
                  txAlbum.executeSql('select * from albums where album_name = ? and album_artist = ?', [track.album.name, artist_id]);
                })
                .catch(e => console.log(e));
            })
              .then((res: any) => {
                let album_id = res.rows.item(0).album_id;
                this.dataBase.transaction((txTrack: DbTransaction) => {
                  txTrack.executeSql('select * from tracks where track_name = ? and track_album = ?', [track.name, album_id]);
                })
                  .then((res: any) => {
                    let track_id = res.rows.item(0).track_id;
                    for (let genre of track.genres) {
                      tx.executeSql('insert into track_genre(track_id, genre_id) values (?, ?)', [track_id, genre]);
                    }
                    for (let playlist of this.data.playlists) {
                      if (playlist.trackList.indexOf(track)>-1) {
                        this.dataBase.transaction((txPlaylist: DbTransaction) => {
                          txPlaylist.executeSql('select * from playlists where playlist_name = ?', [playlist.name]);
                        })
                          .then((res: any) => {
                            let playlist_id = res.rows.item(0).playlist_id;
                            tx.executeSql('insert into playlist_track(track_id, playlist_id) values (?, ?)', [track_id, playlist_id]);
                          })
                      }
                    }
                  })

              })
          }
        })
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }

  getAll(): void {
    this.dataBase.transaction((tx: DbTransaction) => {
      tx.executeSql('select * from artists', []);
    })
      .then((res: any) => {
        let item;
        for (let i=0; i<res.length; i++) {
          item = res.rows.item(i);
          Artist.get(item.artist_name, this.data, item.artist_img, item.artist_id);
        }
        return this.dataBase.transaction((tx: DbTransaction) => {
          tx.executeSql('select * from albums', []);
        })
      })
      .then((res: any) => {
        let item;
        for (let i=0; i<res.length; i++) {
          item = res.rows.item(i);
          let artist = this.data.artists.filter(a => a.id == item.album_artist)[0];
          Album.get(artist, this.data, item.album_name, item.album_cover, item.album_year, item.album_id);
        }
        return this.dataBase.transaction((tx: DbTransaction) => {
          tx.executeSql('select * from tracks', []);
        })
      })
      .then((res: any) => {
        let item;
        for (let i=0; i<res.length; i++) {
          item = res.rows.item(i);
          let album = this.data.albums.filter(a => a.id == item.track_album)[0];
          let language = Language.get(item.track_language, this.data);
          Track.get(this.data, item.track_name, item.track_file, album, item.album_nb,
            item.track_duration, language, item.track_id);
        }
        return this.dataBase.transaction((tx: DbTransaction) => {
          tx.executeSql('select * from playlists', []);
        })
      })
      .then((res: any) => {
        let item;
        for (let i=0; i<res.length; i++) {
          item = res.rows.item(i);
          Playlist.get(this.data, item.playlist_name, item.playlist_cover,
            item.playlist_id, item.playlist_description);
        }
        return this.dataBase.transaction((tx: DbTransaction) => {
          tx.executeSql('select * from track_genre', []);
        })
      })
      .then((res: any) => {
        let item;
        for (let i=0; i<res.length; i++) {
          item = res.rows.item(i);
          let track = this.data.tracks.filter(t => t.id == item.track_id)[0];
          let genre = Genre.get(item.genre_id, this.data);
          track.genres.push(genre);
        }
        return this.dataBase.transaction((tx: DbTransaction) => {
          tx.executeSql('select * from album_artist', []);
        })
      })
      .then((res: any) => {
        let item;
        for (let i=0; i<res.length; i++) {
          item = res.rows.item(i);
          let album = this.data.albums.filter(a => a.id == item.album_id)[0];
          let artist = this.data.artists.filter(a => a.id == item.artist_id)[0];
          album.artists.push(artist);
        }
        return this.dataBase.transaction((tx: DbTransaction) => {
          tx.executeSql('select * from album_label', []);
        })
      })
      .then((res: any) => {
        let item;
        for (let i=0; i<res.length; i++) {
          item = res.rows.item(i);
          let album = this.data.albums.filter(a => a.id == item.album_id)[0];
          let label = Label.get(item.label_id, this.data);
          album.labels.push(label);
        }
        return this.dataBase.transaction((tx: DbTransaction) => {
          tx.executeSql('select * from playlist_track', []);
        })
      })
      .then((res: any) => {
        let item;
        for (let i=0; i<res.length; i++) {
          item = res.rows.item(i);
          let playlist = this.data.playlists.filter(p => p.id == item.playlist_id)[0];
          let track = this.data.tracks.filter(t => t.id == item.track_id)[0];
          playlist.trackList.push(track);
        }
      })
      .catch(e => console.log(e));
  }
}
