import {Pipe, PipeTransform} from '@angular/core';
import {markerSeparator} from '../globals';

@Pipe({name: 'mask'})
export class MaskPipe implements PipeTransform {

  transform(value: string): string {

    // this pipe needs to used with [innerHtml] to get the markup, malicious HTML will still be escaped,
    // but harmless html lik <h1> will be rendered
    // see https://netbasal.com/angular-2-security-the-domsanitizer-service-2202c83bd90
    let regEx = new RegExp('(' + markerSeparator + '.+' + markerSeparator + ')', 'g');

    return value.replace(regEx, this.generateStars);
  }

  generateStars(match: string): string {
    let regEx = new RegExp(markerSeparator, 'g');
    let cleanMatch = match.replace(regEx, '');

    let stars = '';
    for (let i=0; i < cleanMatch.length; i++)
    {
      if (cleanMatch[i] == ' '){
        stars += '&nbsp;&nbsp;';
      }
      else {
        stars += '*';
      }
    }

    return '<span class="label label-success">' + stars + '</span>';
  }
}
