import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'stars'})
export class StarPipe implements PipeTransform {

  transform(value: string): string {

    let stars = '';
    for (let i = 0; i < value.length; i++){
      stars = stars + '*';
    }

    return stars;
  }
}
