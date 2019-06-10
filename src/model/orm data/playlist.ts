import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Track} from "./track";

@Entity('playlist')
export class Playlist {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({nullable: true})
  img_big: string;

  @Column({nullable: true})
  img_little: string;

  @Column({nullable: true})
  description: string;

  @ManyToMany(type => Track, tracks => tracks.playlists)
  @JoinTable()
  tracks: Track[];
}
