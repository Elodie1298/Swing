import {DataProvider} from "../providers/data";

export class Genre {
  name: string;

  private constructor() {}

  static get(name: string, data: DataProvider): Genre {
    let genres = data.genres.filter(g => g.name == name);
    if (genres.length == 0) {
      let genre = new Genre();
      genre.name = name;
      data.genres.push(genre);
      return genre;
    } else {
      return genres[0];
    }
  }
}
