import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import {MusicListPage} from "../music-list/music-list";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  //TODO: Change of tabs by swiping (NativePageTraansition)

  //TODO: name or not name ?
  //TODO: update root
  tabs = [
    {root: MusicListPage, name:"Musiques", rootparams: {}, icon: "musical-notes"},
    {root: HomePage, name:"Artistes", rootparams: {}, icon: "person"},
    {root: HomePage, name:"Playlists", rootparams: {}, icon: "list-box"},
    {root: HomePage, name:"Paramètres", rootparams: {}, icon: "settings"}
  ];

  constructor() {

  }
}
