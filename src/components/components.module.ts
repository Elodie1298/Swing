import { NgModule } from '@angular/core';
import { MusicListComponent } from './music-list/music-list';
import { ArtistListComponent } from './artist-list/artist-list';
import { PlaylistListComponent } from './playlist-list/playlist-list';
import {IonicModule} from "ionic-angular";
import { AlbumListComponent } from './album-list/album-list';
import { MusicListItemComponent } from './music-list-item/music-list-item';
@NgModule({
	declarations: [MusicListComponent,
    ArtistListComponent,
    PlaylistListComponent,
    AlbumListComponent,
    MusicListItemComponent],
	imports: [IonicModule],
	exports: [MusicListComponent,
    ArtistListComponent,
    PlaylistListComponent,
    AlbumListComponent,
    MusicListItemComponent]
})
export class ComponentsModule {}
