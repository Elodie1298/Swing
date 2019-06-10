import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Track} from "./track";

@Entity('playlist')
export class Playlist {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  img_big: string;

  @Column()
  img_little: string;

  @Column()
  description: string;

  @ManyToMany(type => Track, tracks => tracks.playlists)
  @JoinTable()
  tracks: Track[];
}
