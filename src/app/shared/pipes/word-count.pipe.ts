import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordCount'
})
export class WordCountPipe implements PipeTransform {

  transform(value: string, limit: number = 100): { count: number; isFull: boolean } {
    
    const trimmed = value.trim();
    const isEmpty = trimmed === '';

    const count = isEmpty ? 0 : trimmed.split(/\s+/).length;
    const isFull = count >= limit;
    return { count, isFull };
  }
}
