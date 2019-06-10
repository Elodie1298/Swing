import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Artist} from "./artist";
import {Album} from "./album";

@Entity('genre')
export class Genre {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(type => Artist, artists => artists.genres)
  artists: Artist[];

  @ManyToMany(type => Album, albums => albums.genres)
  albums: Album[];
}
