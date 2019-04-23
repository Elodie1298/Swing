import { Injectable } from '@angular/core';
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";

@Injectable()
export class SqlProvider {
  dataBase: SQLiteObject;

  constructor(private sqlite: SQLite) {}

  initialize(): void {
    this.sqlite.create({
      name: 'jaz.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.dataBase = db;
        console.log('database created', this.dataBase);

        return this.dataBase.transaction(tx => {
          tx.executeSql('drop table if exists music', []); //TODO: remove after tests ok
          tx.executeSql('create table if not exists music(music_id integer primary key autoincrement, music_title text)', []);
          tx.executeSql('insert into music(music_title) values (?)', ['Test']);
        })
      })
      .then(() => {
        this.dataBase.executeSql('select * from music', [])
          .then(res => {console.log(res.rows.item(0))})
          .catch(e => console.log(e));
      })
      .catch(err => console.log(err));
  }
}
