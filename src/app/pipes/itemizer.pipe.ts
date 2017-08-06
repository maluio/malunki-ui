import {Pipe, PipeTransform} from '@angular/core';
import {Itemizer, Item} from '../util/itemizer';

@Pipe({name: 'itemizer'})
export class ItemizerPipe implements PipeTransform {

  constructor(
    private itemizer: Itemizer
  ) {
  }

  transform(value: string): string {

    let ul = '';

    const items: Item[] = this.itemizer.itemize(value);

    items.forEach(
      (item) =>  {
        if (item.data) {
          ul += '<li>' + item.data + '</li>';
        }
      }
    );

    if (ul) {
      return '<ul>' + ul + '</ul>';
    }

    return value;
  }
}
