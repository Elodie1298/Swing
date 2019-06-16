import {DataProvider} from "../providers/data";

export class Label {
  name: string;

  private constructor() {}

  static get(name: string, data: DataProvider): Label {
    let labels = data.labels.filter(l => l.name == name);
    if (labels.length == 0) {
      let label = new Label();
      label.name = name;
      return label;
    } else {
      return labels[0];
    }
  }
}
