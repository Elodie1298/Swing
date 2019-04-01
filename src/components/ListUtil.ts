
import {Artist} from "../model/Artist";

export class ListUtil {

  static parseCol3(list: Array<any>): Array<any> {
    let array = new Array();
    let anyArray;
    for (let i=0 ; i<list.length ; i++) {
      if (i%3 == 0 ){
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

  public static getFirstItems(items: Array<any>, maxLen: number = 3): Array<any> {
    let array = new Array<any>();
    let max = maxLen;
    if (items.length < max) {
      max = items.length;
    }
    for (let i=0 ; i<max ; i++) {
      array.push(items[i])
    }
    return array;
  }
}
