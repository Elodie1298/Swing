import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import {MusicListPage} from "../music-list/music-list";
import {ArtistListPage} from "../artist-list/artist-list";
import {PlaylistListPage} from "../playlist-list/playlist-list";
import {SearchPage} from "../search/search";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  //TODO: Change of tabs by swiping (NativePageTraansition)

  //TODO: name or not name ?
  //TODO: update root
  tabs = [
    {root: MusicListPage, name:"Musiques", rootparams: {}, icon: "musical-notes"},
    {root: ArtistListPage, name:"Artistes", rootparams: {}, icon: "person"},
    {root: PlaylistListPage, name:"Playlists", rootparams: {}, icon: "list-box"},
    {root: SearchPage, name:"Search", rootparams: {}, icon: "search"},
    {root: HomePage, name:"Paramètres", rootparams: {}, icon: "settings"}
  ];

  constructor() {

  }
}
