import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRange]',
})
export class RangeDirective {
  @Input() set appRange(config: { start: number; end: number; step: number;decimalPlaces?: number }) {
    const decimalPlaces = config.decimalPlaces || 2;
    const iterations = Math.round((config.end - config.start) / config.step);
    
    for (let i = 0; i <= iterations; i++) {
      const roundedValue = parseFloat((config.start + i * config.step).toFixed(decimalPlaces));
      this.viewContainer.createEmbeddedView(this.templateRef, { $implicit: roundedValue });
    }
  }

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}
}