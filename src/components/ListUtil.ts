import {Artist} from "../model/Artist";

export class ListUtil {

  static parseCol3(list: Array<any>): Array<any> {
    if (list != undefined) {
      let array = new Array();
      let anyArray;
      for (let i = 0; i < list.length; i++) {
        if (i % 3 == 0) {
          if (anyArray != null) {
            array.push(anyArray);
          }
          anyArray = new Array<Artist>();
        }
        anyArray.push(list[i]);
      }
      array.push(anyArray);
      return array;
    }
    return list;
  }

  public static getFirstItems(items: Array<any>, maxLen: number = 3): Array<any> {
    if (items != undefined) {
      let array = new Array<any>();
      let max = maxLen;
      if (items.length < max) {
        max = items.length;
      }
      for (let i = 0; i < max; i++) {
        array.push(items[i])
      }
      return array;
    }
    return items;
  }

  public static getGroupsByTitle(list: Array<any>): Array<any> {
    if (list != undefined) {
      let gr, letter, objs, groups;
      groups = new Array<any>();

      for (let obj of list) {
        letter = obj.name.substring(0, 1).toUpperCase();
        if (letter.match(/[A-Z]/i) == null) {
          letter = '#';
        }
        if ((gr = this.isLetter(letter, groups)) != null) {
          gr.list.push(obj);
        } else {
          objs = new Array<any>();
          objs.push(obj);
          gr = {letter: letter, list: objs};
          groups.push(gr);
        }
      }

      for (let group of groups) {
        group.list.sort((a, b) => this.compareString(a.name, b.name));
      }
      groups.sort((a, b) => this.compareString(a.letter, b.letter));
      return groups;
    }
    return list;
  }
  public static getGroupsByName(list: Array<any>): Array<any> {
    if (list != undefined) {
      let gr, letter, objs, groups;
      groups = new Array<any>();

      for (let obj of list) {
        letter = obj.name.substring(0, 1).toUpperCase();
        if (letter.match(/[A-Z]/i) == null) {
          letter = '#';
        }
        if ((gr = this.isLetter(letter, groups)) != null) {
          gr.list.push(obj);
        } else {
          objs = new Array<any>();
          objs.push(obj);
          gr = {letter: letter, list: objs};
          groups.push(gr);
        }
      }

      for (let group of groups) {
        group.list.sort((a, b) => this.compareString(a.name, b.name));
      }
      groups.sort((a, b) => this.compareString(a.letter, b.letter));
      return groups;
    }
    return list;
  }

  static isLetter(letter, groups): any  {
    for (let group of groups) {
      if (group.letter == letter) {
        return group;
      }
    }
    return null;
  }

  static compareString(a: string, b: string): number {
    if (a.length == 0) {
      return -1;
    }
    if (b.length == 0) {
      return 1;
    }
    if (a[0] < b[0]) {
      return -1;
    }
    if (a[0] > b[0]) {
      return 1;
    }
    a = a.substring(1);
    b = b.substring(1);
    return this.compareString(a, b);
  }
}
