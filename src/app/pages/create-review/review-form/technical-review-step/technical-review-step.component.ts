import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-technical-review-step',
  templateUrl: './technical-review-step.component.html',
  styleUrls: ['./technical-review-step.component.scss']
})
export class TechnicalReviewStepComponent {
  @Input() technicalGroup!:FormGroup
  constructor(){}
}
