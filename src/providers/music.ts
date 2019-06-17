import {Injectable} from '@angular/core';
import {Media, MEDIA_STATUS, MediaObject} from "@ionic-native/media";
import {Track} from "../model/Track";
import {DataProvider} from "./data";
import {Album} from "../model/Album";
import {Artist} from "../model/Artist";
import {Genre} from "../model/Genre";
import {Label} from "../model/Label";


@Injectable()
export class MusicProvider {
  private _mediaObject: MediaObject;
  private _trackList: Array<Track>;
  private _nTrack: number;
  private _paused: boolean = false;

  on: boolean = false;

  constructor(private media: Media,
              private data: DataProvider) {
    this._trackList = new Array<Track>();
    this._nTrack = 0;
  }

  setMediaPlaying(tracks: Array<Track>, n: number): void {
    this._trackList = tracks;
    this._nTrack = n;
    if (this._mediaObject) this._mediaObject.release();
    this._mediaObject = this.media.create(tracks[n].file);
    this._mediaObject.play();
    this._mediaObject.onStatusUpdate.toPromise()
      .then((status: MEDIA_STATUS) => {
        if (status == MEDIA_STATUS.STOPPED) {
          this.next();
        }
      })
      .catch(e => console.log(e));
    this.on = true;
  }

  shuffle(trackList: Array<Track>): Array<Track> {
    let tracks: Array<Track> = new Array<Track>();
    for (let track of trackList){
      tracks.push(track);
    }
    tracks.sort(() => Math.random()-0.5);
    return tracks;
  }

  get currentMusic(): Track {
    return this._trackList[this._nTrack];
  }
  get paused(): boolean {
    return this._paused;
  }
  get trackList(): Array<Track> {
    return this._trackList;
  }

  playpause(): void {
    if (this._paused) this._mediaObject.play();
    else this._mediaObject.pause();
    this._paused = !this._paused;
  }
  stop(): void {
    this._mediaObject.stop();
    this.on = false;
  }

  next(): void {
    this._nTrack = (this._nTrack + 1)%this._trackList.length;
    this._mediaObject.release();
    this._mediaObject = this.media.create(this._trackList[this._nTrack].file);
    this._mediaObject.onStatusUpdate.toPromise()
      .then((status: MEDIA_STATUS) => {
        if (status == MEDIA_STATUS.STOPPED) {
          this.next();
        }
      })
      .catch(e => console.log(e));
    this._mediaObject.play();
  }
  previous(): void {
    this._nTrack = (this._nTrack - 1)%this._trackList.length;
    this._mediaObject.release();
    this._mediaObject = this.media.create(this._trackList[this._nTrack].file);
    this._mediaObject.onStatusUpdate.toPromise()
      .then((status: MEDIA_STATUS) => {
        if (status == MEDIA_STATUS.STOPPED) {
          this.next();
        }
      })
      .catch(e => console.log(e));
    this._mediaObject.play();
  }

  get duration(): number {
    return Math.trunc(this._mediaObject.getDuration());
  }

  get position():Promise<any> {
    return this._mediaObject.getCurrentPosition();
  }

  addTrackRandomPlace(track: Track): void {
    if (!this.on) {
      let tracks = this.shuffle(this.data.tracks);
      this.setMediaPlaying(tracks, tracks.indexOf(track));
    }
    else {
      let n = Math.floor(Math.random() * (this._trackList.length - this._nTrack) + this._nTrack);
      this.insertTrack(track, n);
    }
  }
  addTracksRandomPlace(tracks: Array<Track>): void {
    if (!this.on) {
      let n = Math.trunc(Math.random()*tracks.length);
      this.setMediaPlaying(tracks, n);
    } else {
      for (let track of tracks) {
        this.addTrackRandomPlace(track);
      }
    }
  }

  addTrackNextPlace(track): void {
    if (!this.on) {
      this.setMediaPlaying(this.data.tracks, this.data.tracks.indexOf(track));
    }
    else {
      this.insertTrack(track, this._nTrack+1);
    }
  }
  addTracksNextPlace(tracks: Array<Track>): void {
    if (!this.on) {
      let n = Math.trunc(Math.random()*tracks.length);
      this.setMediaPlaying(tracks, n);
    } else {
      for (let i = tracks.length - 1; i >= 0; i--) {
        this.addTrackNextPlace(tracks[i]);
      }
    }
  }

  insertTrack(track: Track, n: number): void {
    let newList = new Array<Track>();
    for (let i=0 ; i<this._trackList.length; i++) {
      if (i==n) {
        newList.push(track);
      }
      newList.push(this._trackList[i]);
    }
    if (n==this._trackList.length) {
      newList.push(track);
    }
    this._trackList = newList;
  }

  improFromTrack(track: Track): void {
    let tracks = this.shuffle(this.data.tracks);
    let n = tracks.indexOf(track);
    this.setMediaPlaying(tracks, n);
  }
  improFromAlbum(album: Album): void {
    let tracks = this.shuffle(this.data.tracks.filter(t => t.album == album));
    let n = Math.floor(Math.random() * tracks.length);
    this.setMediaPlaying(tracks, n);
  }
  improFromArtist(artist: Artist): void {
    let tracks = this.shuffle(this.data.tracks.filter(t => t.album.artists.indexOf(artist)>-1));
    let n = Math.floor(Math.random() * tracks.length);
    this.setMediaPlaying(tracks, n);
  }
  improFromGenre(genre: Genre): void {
    let tracks = this.shuffle(this.data.tracks.filter(t => t.genres.indexOf(genre)>-1));
    let n = Math.floor(Math.random() * tracks.length);
    this.setMediaPlaying(tracks, n);
  }
  improFromLabel(label: Label): void {
    let tracks = this.shuffle(this.data.tracks.filter(t => t.album.labels.indexOf(label)>-1));
    let n = Math.floor(Math.random() * tracks.length);
    this.setMediaPlaying(tracks, n);
  }
}
