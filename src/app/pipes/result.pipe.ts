import {Pipe, PipeTransform} from '@angular/core';
import {markerSeparator} from '../globals'

@Pipe({name: 'result'})
export class ResultPipe implements PipeTransform {

  transform(value: string): string {

    // this pipe needs to used with [innerHtml] to get the markup, malicious HTML will still be escaped,
    // but harmless html lik <h1> will be rendered
    // see https://netbasal.com/angular-2-security-the-domsanitizer-service-2202c83bd90
    let regEx = new RegExp('(' + markerSeparator + '.+' + markerSeparator + ')', 'g');
    return value.replace(regEx, function (match) {
      let regExNew = new RegExp(markerSeparator, 'g');
        return '<span class="label label-success">' + match.replace(regExNew, '') + '</span>';
    });
  }
}
