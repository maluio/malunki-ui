import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'itemizer'})
export class ItemizerPipe implements PipeTransform {

  transform(value: string): string {

    let ul = '';

    const temp = value.replace(/\r\n/g, '^^^^^').replace(/[\r\n]/g, '^^^^^');

    const arr = temp.split('^^^^^');

    arr.forEach(
      (line) =>  {
        if (line) {
          ul += '<li>' + line + '</li>';
        }
      }
    );

    if (ul) {
      return '<ul>' + ul + '</ul>';
    }

    return value;
  }
}
