import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Genre} from "./genre";
import {Album} from "./album";

@Entity('artist')
export class Artist {

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

  @ManyToMany(type => Genre, genres => genres.artists)
  @JoinTable()
  genres: Genre[];

  @ManyToMany(type => Album, albums => albums.artists)
  @JoinTable()
  albums: Album[];

}
