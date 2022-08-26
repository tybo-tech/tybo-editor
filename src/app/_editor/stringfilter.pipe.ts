import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringfilter'
})
export class StringfilterPipe implements PipeTransform {

  transform(value: string[], ...args: any): string[] {
    if (!value)
      return [];


    return value.filter(x => x.includes(args));
  }

}
