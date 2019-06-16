

export class ExtractId3Provider {
  readonly ID3_HEADER_SIZE = 10;

  constructor() {}

  static canReadTagFormat(tagIdentifier: Array<number>): boolean {
    let id = String.fromCharCode.apply(String, tagIdentifier.slice(0, 3));
    return id === 'ID3'
  }

  // private static loadData()
}
