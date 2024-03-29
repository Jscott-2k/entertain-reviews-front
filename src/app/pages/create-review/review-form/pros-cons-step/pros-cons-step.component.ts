import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateReviewFormService } from '../../services/create-review-form.service';
import { Subscription } from 'rxjs';
import { FormStepComponent } from '../form-step/form-step.component';
import { CreateReviewFormConfig } from '../create-review-form-config';

@Component({
  selector: 'app-pros-cons-step',
  templateUrl: './pros-cons-step.component.html',
  styleUrls: ['./pros-cons-step.component.scss', '../../create-review.component.scss']
})
export class ProsConsStepComponent extends FormStepComponent implements OnInit, OnDestroy {
  @Output() onProConListChange:EventEmitter<string> =  new EventEmitter<string>();

  private _subscriptions: Subscription[] = [];

  constructor(private formBuilder:FormBuilder, private formService:CreateReviewFormService) { 
    super(formService);
  }
  get characterLimit(): number{
    return CreateReviewFormConfig.proConCharacterLimit; 
  }

  ngOnInit(): void {
    this.subscribeToProConListChanges();  
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  // Add a new pro to the list
  addPro(): void {
    const newProControl = this.formBuilder.group({
      description: ['', [Validators.required, Validators.maxLength(this.characterLimit)]],
      modifier: [0, Validators.required],
    });
    this.formService.prosArray.push(newProControl);
    
    this._subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.subscribeToProConListChanges();
  }

  // Add a new con to the list
  addCon(): void {
    const newConControl = this.formBuilder.group({
      description: ['', [Validators.required, Validators.maxLength(this.characterLimit)]],
      modifier: [0, Validators.required],
    });
    this.formService.consArray.push(newConControl);

    this._subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.subscribeToProConListChanges();
  }

  removePro(index: number): void {
    this.formService.prosArray.removeAt(index);
  }

  removeCon(index: number): void {
    this.formService.consArray.removeAt(index);
  }

  subscribeToProConListChanges(): void {
    this.formService.prosControls.forEach((group) => {
      let modifier = group.get("modifier");
      if (modifier) {
        const subscription = modifier.valueChanges.subscribe(() => {
          this.onProConListChange.emit();
        });
        this._subscriptions.push(subscription);
      }
    });

    this.formService.consControls.forEach((group) => {
      let modifier = group.get("modifier");
      if (modifier) {
        const subscription = modifier.valueChanges.subscribe(() => {
          this.onProConListChange.emit();
        });
        this._subscriptions.push(subscription);
      }
    });

  }
}
