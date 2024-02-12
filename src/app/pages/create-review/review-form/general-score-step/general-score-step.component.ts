import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CreateReviewFormConfig } from '../create-review-form-config';
import { CreateReviewFormService } from '../../services/create-review-form.service';
import { SliderConfig } from 'src/app/shared/interfaces/slider-config.interface';
import { Observable, Subscription } from 'rxjs';
import { CreateReviewLogicService } from '../../services/create-review-logic.service';
import { FormStepComponent } from '../form-step/form-step.component';

@Component({
  selector: 'app-general-score-step',
  templateUrl: './general-score-step.component.html',
  styleUrls: ['./general-score-step.component.scss', '../../create-review.component.scss']
})
export class GeneralScoreStepComponent extends FormStepComponent implements OnInit, OnDestroy {

  @Output() onScoreChange = new EventEmitter<string>();

  private _generalScoreLabelMap: { [key: string]: { label: string } } | null = null;
  private _allGeneralScoreSliderKeys: string[] | null = null;
  private _subscriptions: Subscription[] = [];
  
  weightedAverageValue$: Observable<number> | undefined;
  unweightedAverageValue$: Observable<number> | undefined;

  constructor(
    private formService: CreateReviewFormService,
    private logicService:CreateReviewLogicService) { 
      super(formService);
    }

  ngOnInit(): void {
    this.initScoreSliderControls();
    this.subscribeToSliderChanges();
    this.unweightedAverageValue$ = this.logicService.unweightedAverageValue$;
    this.weightedAverageValue$ = this.logicService.weightedAverageValue$;
  }
  ngOnDestroy(): void {
    this._subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  private initScoreSliderControls(): { [key: string]: { label: string } } | null {
    if (!this._generalScoreLabelMap) {
      this._generalScoreLabelMap = this.buildUnifiedScoreSliderControls();
    }
    return this._generalScoreLabelMap;
  }

  private buildUnifiedScoreSliderControls(): { [key: string]: { label: string } } {

    const unifiedSliderControls: { [key: string]: { label: string } } = {};

    CreateReviewFormConfig.scoreControlNames.forEach((scoreControlName, index) => {
      const weightControlName = CreateReviewFormConfig.weightControlNames[index];

      const scoreLabel = CreateReviewFormConfig.scoreLabelMapping[scoreControlName] || '';
      const weightLabel = CreateReviewFormConfig.weightLabelMapping[weightControlName] || '';

      unifiedSliderControls[scoreControlName] = { label: scoreLabel };
      unifiedSliderControls[weightControlName] = { label: weightLabel };

    });

    return unifiedSliderControls;
  }

  get generalScoreSlidersLabelObject(): { [key: string]: { label: string } } | null {
    if (!this._generalScoreLabelMap) {
      console.warn('General score sliders accessed before initialization. Call initScoreSliderControls in ngOnInit.');
      return {};
    }
    return this._generalScoreLabelMap;
  }

  get generalScoreSliders(): string[] {
    if (!this._allGeneralScoreSliderKeys && !this._generalScoreLabelMap) {
      console.warn('General score sliders accessed before initialization. Call initScoreSliderControls in ngOnInit.');
      return [];
    }
    if (!this._allGeneralScoreSliderKeys) {
      this._allGeneralScoreSliderKeys = Object.keys(this._generalScoreLabelMap || {});
    }
    return this._allGeneralScoreSliderKeys;
  }
  get ScoreSliderConfig(): SliderConfig {
    return {
      minValue: 0,
      maxValue: 10,
      stepValue: .25,
    }
  }
  getGeneralScoreSliderControl(name: string): FormControl {
    return this.formService.generalScoreGroup.get(name) as FormControl;
  }

  getGeneralScoreSliderLabel(index: number): string {
    const sliderName = this.generalScoreSliders[index];
    return this.getGeneralScoreSliderLabelByControlName(sliderName);
  }

  getGeneralScoreSliderLabelByControlName(controlName: string): string {
    const sliderControl = this._generalScoreLabelMap?.[controlName];
    return sliderControl?.label || '';
  }

  subscribeToSliderChanges(): void {
    this.generalScoreSliders.forEach((controlName) => {
      const control = this.formService.generalScoreGroup.get(controlName);
      if (control) {
        const subscription = control.valueChanges.subscribe(() => {
          this.onScoreChange.emit();
        });
        this._subscriptions.push(subscription);
      }
    });
  }
}