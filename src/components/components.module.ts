import { NgModule } from '@angular/core';
import { MusicListComponent } from './lists/tracks/track-list/track-list';
import { ArtistListComponent } from './lists/artists/artist-list/artist-list';
import { PlaylistListComponent } from './lists/playlists/playlist-list/playlist-list';
import {IonicModule} from "ionic-angular";
import { AlbumListComponent } from './lists/albums/album-list/album-list';
import { MusicListItemComponent } from './lists/tracks/track-list-item/track-list-item';
import { AlbumListItemComponent } from './lists/albums/album-list-item/album-list-item';
import { ArtistListItemComponent } from './lists/artists/artist-list-item/artist-list-item';
import { PlaylistListItemComponent } from './lists/playlists/playlist-list-item/playlist-list-item';
import { PlaybarComponent } from './playbar/playbar';
import { PlaybarButtonsComponent } from './playbar/playbar-buttons/playbar-buttons';
import { PlayerComponent } from './player/player';
import { ImgHeaderComponent } from './img-header/img-header';
import { PlaybarSliderComponent } from './playbar/playbar-slider/playbar-slider';
import { PlaylistFavItemComponent } from './lists/playlists/playlist-fav-item/playlist-fav-item';
import { GenreListComponent } from './lists/genre-list/genre-list';
import { LabelListComponent } from './lists/label-list/label-list';
import { LabelOrGenreItemComponent } from './lists/label-or-genre-item/label-or-genre-item';
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
    PlaylistFavItemComponent,
    GenreListComponent,
    LabelListComponent,
    LabelOrGenreItemComponent],
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
    PlaylistFavItemComponent,
    GenreListComponent,
    LabelListComponent,
    LabelOrGenreItemComponent]
})
export class ComponentsModule {}
