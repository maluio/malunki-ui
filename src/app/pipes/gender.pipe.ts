import {Pipe, PipeTransform} from '@angular/core';
import {markerGenderFemaleRegEx, markerGenderMaleRegEx} from '../globals'

@Pipe({name: 'gender'})
export class GenderPipe implements PipeTransform {

  transform(value: string): string {

    let regExMale = new RegExp(markerGenderMaleRegEx, 'g');
    value= value.replace(regExMale, '<span class="label label-info"><i class="fa fa-mars"></i></span>');

    let regExFemale = new RegExp(markerGenderFemaleRegEx, 'g');
    value = value.replace(regExFemale, '<span class="label label-danger"><i class="fa fa-venus"></i></span>');

    return value;
  }
}
