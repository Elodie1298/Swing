import { Injectable } from '@angular/core';
import {Media, MediaObject} from "@ionic-native/media";
import {Music} from "../../model/Music";


@Injectable()
export class MusicProvider {
  private _mediaObject: MediaObject;
  private _musicList: Array<Music>;
  private _nMusic: number;
  private _paused: boolean = false;

  on: boolean = false;

  constructor(private media: Media) {}

  setMediaPlaying(musics: Array<Music>, n: number) {
    this._musicList = musics;
    this._nMusic = n;
    if (this._mediaObject) this._mediaObject.release();
    this._mediaObject = this.media.create(musics[n].file);
    this._mediaObject.play();
    this.on = true;
  }

  get currentMusic(): Music {
    return this._musicList[this._nMusic];
  }
  get paused(): boolean {
    return this._paused;
  }
  get musicList(): Array<Music> {
    return this._musicList;
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
    this._nMusic = (this._nMusic + 1)%this._musicList.length;
    this._mediaObject.release();
    this._mediaObject = this.media.create(this._musicList[this._nMusic].file);
    this._mediaObject.play();
  }
  previous() {
    this._nMusic = (this._nMusic - 1)%this._musicList.length;
    this._mediaObject.release();
    this._mediaObject = this.media.create(this._musicList[this._nMusic].file);
    this._mediaObject.play();
  }

  get duration() {
    return this._mediaObject.getDuration();
  }

  get position():Promise<any> {
    return this._mediaObject.getCurrentPosition();
  }
}
