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

        //TODO: remove after tests ok
        this.dataBase.executeSql('drop table if exists tracks', []);
        this.dataBase.executeSql('drop table if exists albums', []);
        this.dataBase.executeSql('drop table if exists artist', []); //TODO: add 's'
        this.dataBase.executeSql('drop table if exists artists', []);
        this.dataBase.executeSql('drop table if exists playlists', []);
        this.dataBase.executeSql('drop table if exists tracks', []);
        this.dataBase.executeSql('drop table if exists tracks', []);
        this.dataBase.executeSql('drop table if exists tracks', []);
        this.dataBase.executeSql('create table if not exists tracks(' +
          'track_name text,' +
          'track_file text,' +
          'track_album  integer,' +
          'track_album_nb integer,' +
          'track_duration integer,' +
          'track_language text,' +
          'constraint track_pk primary key (track_name, track_album)' +
            ')', []);
        this.dataBase.executeSql('create table if not exists albums(' +
          'album_name text,' +
          'album_cover text,' +
          'album_artist  integer,' +
          'album_year integer,' +
          'constraint track_pk primary key (album_name, album_artist)' +
          ')', []);
        this.dataBase.executeSql('create table if not exists artists(' +
          'artist_name text primary key,' +
          'artist_img text' +
          ')', []);
        this.dataBase.executeSql('create table if not exists playlists(' +
          'playlist_name text primary key,' +
          'playlist_cover text,' +
          'playlist_description  text' +
          ')', []);

        this.dataBase.executeSql('create table if not exists track_genre(' +
          'track_name text,' +
          'genre_name text,' +
          'constraint track_genre_pk primary key (track_name, genre_name)' +
          ')', []);
        this.dataBase.executeSql('create table if not exists album_artist(' +
          'album_name text,' +
          'artist_name text,' +
          'constraint album_artist_pk primary key (album_name, artist_name)' +
          ')', []);
        this.dataBase.executeSql('create table if not exists album_label(' +
          'album_name text,' +
          'label_name text,' +
          'constraint album_label_pk primary key (album_name, label_name)' +
          ')', []);
        this.dataBase.executeSql('create table if not exists playlist_track(' +
          'playlist_name text,' +
          'track_name text,' +
          'constraint playlist_track_pk primary key (playlist_name, track_name)' +
          ')', []);
        })
      .catch(err => console.log(err));
  }

  saveAll(): Promise<any> {
    return this.dataBase.transaction((tx: DbTransaction) => {
      // Insert artist
      for (let artist of this.data.artists) {
        tx.executeSql('insert into artists(artist_name, artist_img) values (?, ?)',
          [artist.name, artist.img]);
        console.log('insert artist', artist.name);
      }

      // Insert playlist
      for (let playlist of this.data.playlists) {
        tx.executeSql('insert into playlists(playlist_name, playlist_cover, playlist_description) values (?, ?, ?)',
          [playlist.name, playlist.cover, playlist.description]);
        console.log('insert playlist', playlist.name);
      }

      // Insert album, album_label, album_artist
      for (let album of this.data.albums) {
        tx.executeSql('insert into albums(album_name, album_cover, album_artist, album_year) values (?, ?, ?, ?)',
          [album.name, album.cover, (album.artist) ? album.artist.name : null, album.year]);
        console.log('insert album', album.name);

        for (let label of album.labels) {
          tx.executeSql('insert into album_label(album_name, label_name) values (?, ?)', [album.name, label.name]);
          console.log('insert album label', album.name, label.name);
        }

        for (let artist of album.artists) {
          tx.executeSql('insert into album_artist(album_name, artist_name) values (?, ?)', [album.name, artist.name]);
          console.log('insert album artist', album.name, artist.name);
        }
      }

      // Insert track, track_genre, playlist_track
      for (let track of this.data.tracks) {
        tx.executeSql('insert into tracks(track_name, track_file, track_album, track_album_nb, track_duration, track_language)' +
          ' values (?, ?, ?, ?, ?, ?)',
          [track.name, track.file, (track.album) ? track.album.name : null, track.album_nb, track.duration, track.language.name]);
        console.log('insert track', track.name);

        for (let genre of track.genres) {
          tx.executeSql('insert into track_genre(track_name, genre_name) values (?, ?)', [track.name, genre.name]);
          console.log('insert track genre', track.name, genre.name);
        }

        for (let playlist of this.data.playlists.filter(p => p.trackList.indexOf(track)>-1)) {
          tx.executeSql('insert into playlist_track(track_name, playlist_name) values (?, ?)', [track.name, playlist.name]);
        }
      }
    })
  }

  getAll(): void {
    this.dataBase.executeSql('select * from artists', [])
      .then((res: any) => {
        // Get artists
        let item;
        for (let i=0; i<res.rows.length; i++) {
          item = res.rows.item(i);
          let artist = Artist.get(item.artist_name, this.data, item.artist_img);
          console.log('get artist', artist.name);
        }
        return this.dataBase.executeSql('select * from albums', [])
      })
      .then((res: any) => {
        // Get albums
        let item;
        for (let i = 0; i < res.rows.length; i++) {
          item = res.rows.item(i);
          let artist = this.data.artists.filter(a => a.name==item.album_artist)[0];
          let album = Album.get(artist, this.data, item.album_name, item.album_cover,
            item.album_year);
          console.log('get album', album.name);
        }
        return this.dataBase.executeSql('select * from tracks', [])
      })
      .then((res: any) => {
        // Get tracks
        let item;
        for (let i = 0; i < res.rows.length; i++) {
          item = res.rows.item(i);
          let album = this.data.albums.filter(a => a.name==item.track_album)[0];
          let track = Track.get(this.data, item.track_name, item.track_file, album,
            item.track_album_nb, item.track_duration,
            Language.get(item.track_language, this.data));
          console.log('get track', track.name);
        }
        return this.dataBase.executeSql('select * from playlists', [])
      })
      .then((res: any) => {
        // Get playlists
        let item;
        for (let i = 0; i < res.rows.length; i++) {
          item = res.rows.item(i);
          let playlist = Playlist.get(this.data, item.playlist_name, item.playlist_cover,
            item.playlist_description);
          console.log('get playlist', playlist.name);
        }
        return this.dataBase.executeSql('select * from track_genre', [])
      })
      .then((res: any) => {
        // Get track_genre
        let item;
        for (let i = 0; i < res.rows.length; i++) {
          item = res.rows.item(i);
          let track = this.data.tracks.filter(t => t.name==item.track_name)[0];
          let genre = Genre.get(item.genre_name, this.data);
          track.genres.push(genre);
          console.log('get track genre', track.name, genre.name);
        }
        return this.dataBase.executeSql('select * from album_artist', [])
      })
      .then((res: any) => {
        // Get album_artist
        let item;
        for (let i = 0; i < res.rows.length; i++) {
          item = res.rows.item(i);
          let album = this.data.albums.filter(a => a.name==item.album_name)[0];
          let artist = this.data.artists.filter(a => a.name==item.artist_name)[0];
          album.artists.push(artist);
          console.log('get album artist', album.name, artist.name);
        }
        return this.dataBase.executeSql('select * from album_label', [])
      })
      .then((res: any) => {
        // Get album_label
        let item;
        for (let i = 0; i < res.rows.length; i++) {
          item = res.rows.item(i);
          let album = this.data.albums.filter(a => a.name==item.album_name)[0];
          let label = Label.get(item.label_name, this.data);
          album.labels.push(label);
          console.log('get album label', album.name, label.name);
        }
        return this.dataBase.executeSql('select * from playlist_track', [])
      })
      .then((res: any) => {
        // Get playlist_track
        let item;
        for (let i = 0; i < res.rows.length; i++) {
          item = res.rows.item(i);
          let playlist = this.data.playlists.filter(p => p.name==item.playlist_name)[0];
          let track = this.data.tracks.filter(t => t.name==item.track_name)[0];
          playlist.trackList.push(track);
          console.log('get playlist track', playlist.name, track.name);
        }
      })
  }
}
