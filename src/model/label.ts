import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Album} from "./album";

@Entity('label')
export class Label {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(type => Album, albums => albums.labels)
  albums: Album[];

}
