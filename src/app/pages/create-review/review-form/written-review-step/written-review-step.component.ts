import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CreateReviewFormConfig } from "../create-review-form-config";
import { ErrorStateMatcher } from '@angular/material/core';
import { errorMessageMap } from 'src/app/shared/interfaces/error.interface';
import { FormStepComponent } from '../form-step/form-step.component';
import { WordCountPipe } from 'src/app/shared/pipes/word-count.pipe';
import { CreateReviewFormService } from '../../services/create-review-form.service';

@Component({
  selector: 'app-written-review-step',
  templateUrl: './written-review-step.component.html',
  styleUrls: ['./written-review-step.component.scss', '../../create-review.component.scss']
})
export class WrittenReviewStepComponent extends FormStepComponent{
  constructor(private formService:CreateReviewFormService){
    super(formService);
  }
  get requiredWordCount(){
    return CreateReviewFormConfig.writtenReviewWordCountRequired; 
  }
}