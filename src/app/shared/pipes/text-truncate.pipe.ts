import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textTruncate'
})
export class TextTruncatePipe implements PipeTransform {

  transform(value: string, words: number = 100): string {
    if (!value) return '';
    
    const wordArray =  value.split(/\s+/);
    if (wordArray.length > words) {
      return wordArray.slice(0, words).join(' ') + '...';
    }
    return value;
  }
}
