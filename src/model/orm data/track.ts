import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Playlist} from "./playlist";
import {Album} from "./album";

@Entity('track')
export class Track {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  spotify_id: string;

  @Column()
  name: string;

  @Column()
  file: string;

  @Column()
  analysed: boolean;

  @Column()
  danceability: number;

  @Column()
  energy: number;

  @Column()
  speechiness: number;

  @Column()
  acousticness: number;

  @Column()
  instrumentalness: number;

  @Column()
  liveness: number;

  @Column()
  valence: number;

  @Column()
  loudness: number;

  @Column()
  key: number;

  @Column()
  mode: number;

  @Column()
  tempo: number;

  @Column()
  tempo_signature: number;

  @ManyToMany(type => Playlist, playlists => playlists.tracks)
  @JoinTable()
  playlists: Playlist[];

  @ManyToMany(type => Album, albums => albums.tracks)
  albums: Album[];
}
