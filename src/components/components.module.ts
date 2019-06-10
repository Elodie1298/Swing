import { NgModule } from '@angular/core';
import { MusicListComponent } from './lists/musics/music-list/music-list';
import { ArtistListComponent } from './lists/artists/artist-list/artist-list';
import { PlaylistListComponent } from './lists/playlists/playlist-list/playlist-list';
import {IonicModule} from "ionic-angular";
import { AlbumListComponent } from './lists/albums/album-list/album-list';
import { MusicListItemComponent } from './lists/musics/music-list-item/music-list-item';
import { AlbumListItemComponent } from './lists/albums/album-list-item/album-list-item';
import { ArtistListItemComponent } from './lists/artists/artist-list-item/artist-list-item';
import { PlaylistListItemComponent } from './lists/playlists/playlist-list-item/playlist-list-item';
import { PlaybarComponent } from './playbar/playbar';
import { PlaybarButtonsComponent } from './playbar/playbar-buttons/playbar-buttons';
import { PlayerComponent } from './player/player';
import { ImgHeaderComponent } from './img-header/img-header';
import { PlaybarSliderComponent } from './playbar/playbar-slider/playbar-slider';
import { PlaylistFavItemComponent } from './lists/playlists/playlist-fav-item/playlist-fav-item';
@NgModule({
	declarations: [MusicListComponent,
    ArtistListComponent,
    PlaylistListComponent,
    AlbumListComponent,
    MusicListItemComponent,
    AlbumListItemComponent,
    ArtistListItemComponent,
    PlaylistListItemComponent,
    PlaybarComponent,
    PlaybarButtonsComponent,
    PlayerComponent,
    ImgHeaderComponent,
    PlaybarSliderComponent,
    PlaylistFavItemComponent],
	imports: [IonicModule],
	exports: [MusicListComponent,
    ArtistListComponent,
    PlaylistListComponent,
    AlbumListComponent,
    MusicListItemComponent,
    AlbumListItemComponent,
    ArtistListItemComponent,
    PlaylistListItemComponent,
    PlaybarComponent,
    PlaybarButtonsComponent,
    PlayerComponent,
    ImgHeaderComponent,
    PlaybarSliderComponent,
    PlaylistFavItemComponent]
})
export class ComponentsModule {}
