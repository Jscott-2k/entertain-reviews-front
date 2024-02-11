import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { errorMessageMap } from 'src/app/shared/interfaces/error.interface';
import { CreateReviewFormService } from '../../services/create-review-form.service';
import { CreateReviewLogicService } from '../../services/create-review-logic.service';
import { Subscription } from 'rxjs';
import { FormStepComponent } from '../form-step/form-step.component';

@Component({
  selector: 'app-technical-review-step',
  templateUrl: './technical-review-step.component.html',
  styleUrls: ['./technical-review-step.component.scss']
})
export class TechnicalReviewStepComponent extends FormStepComponent implements OnInit, OnDestroy {
  @Output() onTechnicalModifierChange = new EventEmitter<string>();

  private _subscriptions: Subscription[] = [];
  constructor(
    private formService: CreateReviewFormService,
    private logicService:CreateReviewLogicService) {
    super(formService);
  }

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
}
