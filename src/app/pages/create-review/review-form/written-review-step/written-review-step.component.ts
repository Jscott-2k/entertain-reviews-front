import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-written-review-step',
  templateUrl: './written-review-step.component.html',
  styleUrls: ['./written-review-step.component.scss']
})
export class WrittenReviewStepComponent {
  @Input() writtenReviewGroup!: FormGroup;
  constructor(){}
}
