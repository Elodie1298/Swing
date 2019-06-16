import {Injectable} from '@angular/core';
import {Media, MEDIA_STATUS, MediaObject} from "@ionic-native/media";
import {Track} from "../model/Track";
import {DataProvider} from "./data";
import {Album} from "../model/Album";
import {Artist} from "../model/Artist";


@Injectable()
export class MusicProvider {
  private _mediaObject: MediaObject;
  private _trackList: Array<Track>;
  private _nTrack: number;
  private _paused: boolean = false;

  on: boolean = false;

  constructor(private media: Media,
              private data: DataProvider) {}

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
    let n = Math.floor(Math.random()*(this._trackList.length-this._nTrack) + this._nTrack);
    this.insertTrack(track, n);
  }
  addTracksRandomPlace(tracks: Array<Track>): void {
    for (let track of tracks) {
      this.addTrackRandomPlace(track);
    }
  }

  addTrackNextPlace(track): void {
    this.insertTrack(track, this._nTrack+1);
  }
  addTracksNextPlace(tracks: Array<Track>): void {
    for (let i=tracks.length-1; i>=0; i--) {
      this.addTrackNextPlace(tracks[i]);
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
    let n = this.data.tracks.indexOf(track);
    this.setMediaPlaying(this.data.tracks, n);
  }
  improFromAlbum(album: Album): void {
    let n = this.data.tracks.indexOf(this.data.tracks.filter(t => t.album == album)[0]);
    this.setMediaPlaying(this.data.tracks, n);
  }
  improFromArtist(artist: Artist): void {
    let n = this.data.tracks.indexOf(this.data.tracks.filter(t => t.album.artist == artist)[0]);
    this.setMediaPlaying(this.data.tracks, n);
  }
}
