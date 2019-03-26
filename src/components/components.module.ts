import { NgModule } from '@angular/core';
import { MusicListComponent } from './music-list/music-list';
import { ArtistListComponent } from './artist-list/artist-list';
import { PlaylistListComponent } from './playlist-list/playlist-list';
@NgModule({
	declarations: [MusicListComponent,
    ArtistListComponent,
    PlaylistListComponent],
	imports: [],
	exports: [MusicListComponent,
    ArtistListComponent,
    PlaylistListComponent]
})
export class ComponentsModule {}
