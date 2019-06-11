import {Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Playlist} from "./playlist";
import {Album} from "./album";

@Entity('track')
export class Track {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  spotify_id: string;

  @Column()
  name: string;

  @Column()
  file: string;

  @Column({default: false})
  analysed: boolean;

  @Column({nullable: true})
  danceability: number;

  @Column({nullable: true})
  energy: number;

  @Column({nullable: true})
  speechiness: number;

  @Column({nullable: true})
  acousticness: number;

  @Column({nullable: true})
  instrumentalness: number;

  @Column({nullable: true})
  liveness: number;

  @Column({nullable: true})
  valence: number;

  @Column({nullable: true})
  loudness: number;

  @Column({nullable: true})
  key: number;

  @Column({nullable: true})
  mode: number;

  @Column({nullable: true})
  tempo: number;

  @Column({nullable: true})
  tempo_signature: number;

  @ManyToMany(type => Playlist, playlists => playlists.tracks)
  playlists: Playlist[];

  @ManyToOne(type => Album, albums => albums.tracks)
  albums: Album;
}
