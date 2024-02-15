import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NavigationService } from 'src/app/core/navigation.service';
import { PlatformModel } from '../../../models/platform.model';

@Directive({
  selector: '[platformNavigation]'
})
export class PlatformNavigationDirective {

  @Input('platformNavigation') platform!: PlatformModel

  constructor(private el: ElementRef, private navigationService: NavigationService) {}

  @HostListener('click')
  onClick(): void {
    const platformIdString = this.platform.id.toString();
    this.navigationService.navigateToGames([platformIdString]);
  }

}
