import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Genre} from "./genre";
import {Label} from "./label";
import {Artist} from "./artist";
import {Track} from "./track";

@Entity('album')
export class Album {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  spotify_id: string;

  @Column()
  name: string;

  @Column()
  img_big: string;

  @Column()
  img_little: string;

  @Column()
  release_year: number;

  @ManyToMany(type => Genre, genres => genres.albums)
  @JoinTable()
  genres: Genre[];

  @ManyToMany(type => Label, labels => labels.albums)
  @JoinTable()
  labels: Label[];

  @ManyToMany(type => Track, tracks => tracks.albums)
  @JoinTable()
  tracks: Track[];

  @ManyToMany(type => Artist, artists => artists.genres)
  artists: Artist[];

}
