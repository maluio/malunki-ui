import {Pipe, PipeTransform} from '@angular/core';
import {markerImageRegEx} from '../globals'

@Pipe({name: 'image'})
export class ImagePipe implements PipeTransform {

  transform(value: string): string {

    let regExMale = new RegExp(markerImageRegEx, 'g');

    return value.replace(regExMale, '<hr> <img src="$1" class="img-responsive" />');
  }
}
