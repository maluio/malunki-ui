export class Item {
  type: string;
  data: string;

  constructor (type: string, data: string) {
    this.type = type;
    this.data = data;
  }
}

export class Itemizer {

  public itemize(text: string): Item[] {

    const temp = text.replace(/\r\n/g, '^^^^^').replace(/[\r\n]/g, '^^^^^');

    const arr = temp.split('^^^^^');

    const items: Item[] = [];

    arr.forEach(
      (line) =>  {
        if (line) {
          items.push(
            new Item(
              'line',
              line
            )
          );
        }
      }
    );

    return items;
  }
}
