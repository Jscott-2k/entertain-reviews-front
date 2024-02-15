import { Pipe, PipeTransform } from '@angular/core';
import { PlatformModel } from '../../models/platform.model';

@Pipe({
  name: 'platformSort'
})
export class PlatformSortPipe implements PipeTransform {

  transform(platforms: PlatformModel[]): PlatformModel[] {

    return platforms
        .slice()
        .sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));
  }
}
