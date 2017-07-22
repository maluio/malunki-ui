import {Pipe, PipeTransform} from '@angular/core';
import {markerSeparator} from '../globals'

@Pipe({name: 'due'})
export class DuePipe implements PipeTransform {

  transform(value: any): string {

    let diffInMinutes = (value - Date.now()) / 60000;
    let factor = diffInMinutes < 0 ? -1 : 1;
    let output = '';

    if (diffInMinutes * factor < 60) {
      output = Math.round(diffInMinutes) + 'm'
    }
    else if (diffInMinutes * factor < 1440) {
      output = Math.round(diffInMinutes / 60) + 'h'
    }
    else {
      output = Math.round(diffInMinutes / 1440) + 'd'
    }

    if (factor < 0) output = '<span class="label label-warning">' + output + '</span>';

    return output;
  }
}
