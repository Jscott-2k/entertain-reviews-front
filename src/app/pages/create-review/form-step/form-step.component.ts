import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { errorMessageMap } from 'src/app/shared/interfaces/error.interface';
import { CreateReviewFormService } from '../services/create-review-form.service';
import { CreateReviewLogicService } from '../services/create-review-logic.service';
import { CreateReviewUiService } from '../services/create-review-ui.service';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-form-step',
  templateUrl: './form-step.component.html',
  styleUrls: ['./form-step.component.scss']
})
export class FormStepComponent {

  /**
   * TODO
   */
  @Input() errorStateMatcher!: ErrorStateMatcher

  constructor() { }


}
