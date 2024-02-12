import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { errorMessageMap } from 'src/app/shared/interfaces/error.interface';
import { CreateReviewFormService } from '../../services/create-review-form.service';
import { CreateReviewLogicService } from '../../services/create-review-logic.service';
import { CreateReviewUiService } from '../../services/create-review-ui.service';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-form-step',
  templateUrl: './form-step.component.html',
  styleUrls: ['./form-step.component.scss', '../../create-review.component.scss']
})
export class FormStepComponent {

  /**
   * TODO
   */
  @Input() errorStateMatcher!: ErrorStateMatcher;
  @Input() stepGroup!: FormGroup;

  private _formService!: CreateReviewFormService;
  constructor(formService:CreateReviewFormService) { 
    this._formService = formService;
  }

  getError(group: FormGroup, controlName: string) {
    if (!controlName || !group) {
      return "No group or name provided";
    }
    const control = group.get(controlName);

    if (!control) {
      return `Control "${controlName}" not found in the form group`;
    }

    if (control.errors) {
      const errorKey = Object.keys(control.errors)[0] as keyof typeof errorMessageMap;
      if (errorKey) {
        const errorMessage = errorMessageMap[errorKey];
        return errorMessage(control);
      }
    }

    return "No error found";
  }
  isInvalid(group: FormGroup, controlName: string) {
    return group.get(controlName)?.invalid;
  }
  get generalScoreGroup(): FormGroup {
    return this._formService.generalScoreGroup;
  }

  get writtenReviewGroup(): FormGroup {
    return this._formService.writtenReviewGroup;
  }

  get consentGroup(): FormGroup {
    return this._formService.consentGroup;
  }

  get gameDetailsGroup(): FormGroup {
    return this._formService.gameDetailsGroup;
  }

  get prosConsGroup(): FormGroup {
    return this._formService.prosConsGroup;
  }
  get technicalGroup(): FormGroup {
    return this._formService.technicalGroup;
  }
  get prosListControlsGroup() {
    return this._formService.prosListControlsGroup;
  }
  get consListControlsGroup() {
    return this._formService.consListControlsGroup;
  }
  get submitGroup(): FormGroup {
    return this._formService.submitGroup;
  }
}
