import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateReviewFormService } from '../../services/create-review-form.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pros-cons-step',
  templateUrl: './pros-cons-step.component.html',
  styleUrls: ['./pros-cons-step.component.scss']
})
export class ProsConsStepComponent implements OnInit, OnDestroy {
  @Input() prosConsGroup!: FormGroup;
  @Output() onProConListChange:EventEmitter<string> =  new EventEmitter<string>();

  private _subscriptions: Subscription[] = [];

  constructor(private formBuilder:FormBuilder, private formService:CreateReviewFormService) { }

  get prosListControlsGroup(){
    return this.formService.prosListControlsGroup;
  }
  get consListControlsGroup(){
    return this.formService.consListControlsGroup;
  }
  ngOnInit(): void {
    this.subscribeToProConListChanges();  
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  // Add a new pro to the list
  addPro() {
    const newProControl = this.formBuilder.group({
      description: ['', [Validators.required, Validators.maxLength(250)]],
      modifier: [0, Validators.required],
    });
    this.formService.prosList.push(newProControl);
    this._subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.subscribeToProConListChanges();
  }

  // Add a new con to the list
  addCon() {
    const newConControl = this.formBuilder.group({
      description: ['', [Validators.required, Validators.maxLength(250)]],
      modifier: [0, Validators.required],
    });
    this.formService.consList.push(newConControl);
    this._subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.subscribeToProConListChanges();
  }

  removePro(index: number): void {
    this.formService.prosList.removeAt(index);
  }

  removeCon(index: number): void {
    this.formService.consList.removeAt(index);
  }

  subscribeToProConListChanges() {
    this.formService.prosListControlsGroup.forEach((group) => {
      let modifier = group.get("modifier");
      if (modifier) {
        const subscription = modifier.valueChanges.subscribe(() => {
          this.onProConListChange.emit();
        });
        this._subscriptions.push(subscription);
      }
    });

    this.formService.consListControlsGroup.forEach((group) => {
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
