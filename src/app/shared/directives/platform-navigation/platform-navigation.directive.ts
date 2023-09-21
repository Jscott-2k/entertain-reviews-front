import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NavigationService } from 'src/app/core/navigation.service';
import { IPlatform } from '../../interfaces/platform.interface';

@Directive({
  selector: '[platformNavigation]'
})
export class PlatformNavigationDirective {

  @Input('platformNavigation') platform!: IPlatform

  constructor(private el: ElementRef, private navigationService: NavigationService) {}

  @HostListener('click')
  onClick(): void {
    const platformIdString = this.platform.id.toString();
    this.navigationService.navigateToGames([platformIdString]);
  }

}
