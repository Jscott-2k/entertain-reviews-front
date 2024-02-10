import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-general-score-step',
  templateUrl: './general-score-step.component.html',
  styleUrls: ['./general-score-step.component.scss']
})
export class GeneralScoreStepComponent {
  @Input() generalScoreGroup!: FormGroup;
  constructor(){}
}