import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CreateReviewFormConfig } from "../create-review-form-config";
import { ErrorStateMatcher } from '@angular/material/core';
import { errorMessageMap } from 'src/app/shared/interfaces/error.interface';
import { FormStepComponent } from '../../form-step/form-step.component';
import { WordCountPipe } from 'src/app/shared/pipes/word-count.pipe';

@Component({
  selector: 'app-written-review-step',
  templateUrl: './written-review-step.component.html',
  styleUrls: ['./written-review-step.component.scss']
})
export class WrittenReviewStepComponent{
  @Input() writtenReviewGroup!: FormGroup;
  @Input() errorStateMatcher!: ErrorStateMatcher

  constructor(){

  }

  get requiredWordCount(){
    return CreateReviewFormConfig.writtenReviewWordCountRequired; 
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
}