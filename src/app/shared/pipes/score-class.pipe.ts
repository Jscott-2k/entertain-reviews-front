import { Pipe, PipeTransform } from '@angular/core';
import { ScoreRange } from '../interfaces/score-range.interface';


@Pipe({
  name: 'scoreClass'
})
export class ScoreClassPipe implements PipeTransform {

  private scoreRanges: ScoreRange[] = [
    { maxScore: 5, class: 'low' },
    { maxScore: 7, class: 'mid' },
    { maxScore: 9, class: 'high' },
    { maxScore: 10, class: 'perfect' }
  ];


  transform(score: number): string {
    const matchedRange = this.scoreRanges.find(range => score <= range.maxScore);
    const scoreClass = matchedRange ? matchedRange.class : 'default'; // Add a default class if necessary
    return `score--${scoreClass}`;
  }
}
