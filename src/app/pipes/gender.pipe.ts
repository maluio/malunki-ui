import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'gender'})
export class GenderPipe implements PipeTransform {

  transform(value: string): string {

    if (value === 'female') {
      return '<i class="fa fa-venus"></i>';
    }

    if (value === 'male') {
      return '<i class="fa fa-mars"></i>';
    }

    return value;
  }
}
