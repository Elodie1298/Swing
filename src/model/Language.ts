import {DataProvider} from "../providers/data";

export class Language {
  name: string;

  private constructor() {}

  static get(name: string, data: DataProvider): Language {
    let languages = data.languages.filter(l => l.name == name);
    if (languages.length == 0) {
      let language = new Language();
      language.name = name;
      return language;
    } else {
      return languages[0];
    }
  }
}
