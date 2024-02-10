import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { errorMessageMap } from 'src/app/shared/interfaces/error.interface';
import { CreateReviewFormService } from '../../services/create-review-form.service';
import { CreateReviewLogicService } from '../../services/create-review-logic.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-technical-review-step',
  templateUrl: './technical-review-step.component.html',
  styleUrls: ['./technical-review-step.component.scss']
})
export class TechnicalReviewStepComponent implements OnInit, OnDestroy {
  @Input() technicalGroup!:FormGroup;
  @Input() errorStateMatcher!: ErrorStateMatcher
  @Output() onTechnicalModifierChange = new EventEmitter<string>();

  private _subscriptions: Subscription[] = [];
  constructor(
    private formService: CreateReviewFormService,
    private logicService:CreateReviewLogicService) { }

  ngOnInit(): void {
    this.subscribeToTechnicalModifierChanges();
  }
  ngOnDestroy(): void {
    this._subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  subscribeToTechnicalModifierChanges() {
    let scoreModifierControl = this.formService.technicalGroup.get('TechnicalReviewScoreModifier');
    if (scoreModifierControl) {
      this._subscriptions.push(
        scoreModifierControl.valueChanges.subscribe(() => {
          this.onTechnicalModifierChange.emit();
        }));
    } else {
      console.error("Failed to get TechnicalReviewScoreModifier in subscribeToTechnicalModifierChanges call");
    }
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
