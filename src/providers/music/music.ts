import { Injectable } from '@angular/core';
import {Media, MediaObject} from "@ionic-native/media";
import {Track} from "../../model/orm data/track";


@Injectable()
export class MusicProvider {
  private _mediaObject: MediaObject;
  private _trackList: Array<Track>;
  private _nTrack: number;
  private _paused: boolean = false;

  on: boolean = false;

  constructor(private media: Media) {}

  setMediaPlaying(trackList: Array<Track>, n: number) {
    this._trackList = trackList;
    this._nTrack = n;
    if (this._mediaObject) this._mediaObject.release();
    this._mediaObject = this.media.create(trackList[n].file);
    this._mediaObject.play();
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

  playpause() {
    if (this._paused) this._mediaObject.play();
    else this._mediaObject.pause();
    this._paused = !this._paused;
  }
  stop() {
    this._mediaObject.stop();
  }

  next() {
    this._nTrack = (this._nTrack + 1)%this._trackList.length;
    this._mediaObject.release();
    this._mediaObject = this.media.create(this._trackList[this._nTrack].file);
    this._mediaObject.play();
  }
  previous() {
    this._nTrack = (this._nTrack - 1)%this._trackList.length;
    this._mediaObject.release();
    this._mediaObject = this.media.create(this._trackList[this._nTrack].file);
    this._mediaObject.play();
  }

  get duration() {
    return this._mediaObject.getDuration();
  }

  get position():Promise<any> {
    return this._mediaObject.getCurrentPosition();
  }
}
