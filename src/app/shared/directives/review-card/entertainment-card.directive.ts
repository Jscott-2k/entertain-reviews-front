import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[entertainmentCard]'
})
export class EntertainmentCardDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
