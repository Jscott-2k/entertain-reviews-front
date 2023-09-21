import { Pipe, PipeTransform } from '@angular/core';
import { IPlatform } from '../interfaces/platform.interface';

@Pipe({
  name: 'platformSort'
})
export class PlatformSortPipe implements PipeTransform {

  transform(platforms: IPlatform[]): IPlatform[] {

    return platforms
        .slice()
        .sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));
  }
}
