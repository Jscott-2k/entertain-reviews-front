import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { FormStepComponent } from '../form-step/form-step.component';
import { CreateReviewFormService } from '../../services/create-review-form.service';

@Component({
  selector: 'app-consent-step',
  templateUrl: './consent-step.component.html',
  styleUrls:[ './consent-step.component.scss', '../../create-review.component.scss']
})
export class ConsentStepComponent extends FormStepComponent{
  constructor(private formService:CreateReviewFormService){
    super(formService);
  }
}