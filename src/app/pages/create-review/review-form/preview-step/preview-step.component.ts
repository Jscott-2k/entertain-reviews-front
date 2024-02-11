import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CreateReviewFormConfig } from '../create-review-form-config';
import { CreateReviewFormService } from '../../services/create-review-form.service';
import { CreateReviewLogicService } from '../../services/create-review-logic.service';
import { Observable, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { FormStepComponent } from '../form-step/form-step.component';

@Component({
  selector: 'app-preview-step',
  templateUrl: './preview-step.component.html',
  styleUrls: ['./preview-step.component.scss']
})
export class PreviewStepComponent extends FormStepComponent implements OnInit, OnDestroy {
  @Input() previewGroup!: FormGroup;
  @Output() onOverallScoreChange = new EventEmitter<{ w: number, u: number }>();

  private _subscriptions: Subscription[] = [];

  scoreSliderDataSource!: MatTableDataSource<string>;

  weightedAverageValue$: Observable<number> | undefined;
  unweightedAverageValue$: Observable<number> | undefined;

  prosTotalModifier$: Observable<number> | undefined;
  consTotalModifier$: Observable<number> | undefined;

  private _overallWeightedScore: number = 0;
  private _overallUnweightedScore: number = 0;

  constructor(private formService: CreateReviewFormService, private logicService: CreateReviewLogicService) {
    super();
   }

  ngOnDestroy(): void {
    this._subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
  ngOnInit(): void {
    this.scoreSliderDataSource = new MatTableDataSource<string>(CreateReviewFormConfig.scoreControlNames);
    this.subscribeToLogicService();
  }


  get overallWeightedScore(): number {
    return this._overallWeightedScore;
  }
  get overallUnweightedScore(): number {
    return this._overallUnweightedScore;
  }

  calculateProsModifier(): number {
    return this.logicService.updateProsModifier(this.formService.prosListControlsGroup);
  }

  calculateConsModifier(): number {
    return this.logicService.updateConsModifier(this.formService.consListControlsGroup);
  }

  subscribeToLogicService() {
    this._subscriptions.push(this.logicService.overallWeightedScore$.subscribe(overallWeightedScore => {
      this._overallWeightedScore = overallWeightedScore;
      this.onOverallScoreChange.emit({ w: this._overallWeightedScore, u: this.overallUnweightedScore })
    }));
    this._subscriptions.push(
      this.logicService.overallUnweightedScore$.subscribe(overallUnweightedScore => {
        this._overallUnweightedScore = overallUnweightedScore;
        this.onOverallScoreChange.emit({ w: this._overallWeightedScore, u: this.overallUnweightedScore })
      }));

    this.prosTotalModifier$ = this.logicService.prosModifier$;
    this.consTotalModifier$ = this.logicService.consModifier$;

    this.unweightedAverageValue$ = this.logicService.unweightedAverageValue$;
    this.weightedAverageValue$ = this.logicService.weightedAverageValue$;
  }

  getWeightControlValue(scoreControlName: string): number | null {
    if (!this.formService.generalScoreGroup) {
      console.error('generalScoreGroup is not initialized.');
      return null;
    }
    const weightControlName = CreateReviewFormConfig.scoreToWeightMapping[scoreControlName];
    if (!weightControlName) {
      console.error(`Weight control not found for ${scoreControlName}.`);
      return null;
    }
    const weightControl = this.formService.generalScoreGroup.get(weightControlName);
    if (!weightControl) {
      console.error(`Weight control ${weightControlName} not found in generalScoreGroup.`);
      return null;
    }

    return weightControl.value;
  }
  get generalScoreGroup(): FormGroup {
    return this.formService.generalScoreGroup;
  }

  get writtenReviewGroup(): FormGroup {
    return this.formService.writtenReviewGroup;
  }

  get consentGroup(): FormGroup {
    return this.formService.consentGroup;
  }

  get gameDetailsGroup(): FormGroup {
    return this.formService.gameDetailsGroup;
  }

  get prosConsGroup(): FormGroup {
    return this.formService.prosConsGroup;
  }

  get technicalGroup(): FormGroup {
    return this.formService.technicalGroup;
  }
  get prosListControlsGroup(){
    return this.formService.prosListControlsGroup;
  }
  get consListControlsGroup(){
    return this.formService.consListControlsGroup;
  }
  get submitGroup(): FormGroup {
    return this.formService.submitGroup;
  }
  get SelectedGameName(): string {
    return this.getGameAutoCompleteControl()?.value;
  }
  get SelectedPlatformName(): string {
    return this.getPlatformAutoCompleteControl()?.value;
  }

  private getGameAutoCompleteControl(): FormControl {
    return this.formService.gameDetailsGroup.get("GameAutoComplete") as FormControl;
  }
  private getPlatformAutoCompleteControl(): FormControl {
    return this.formService.gameDetailsGroup.get("PlatformAutoComplete") as FormControl;
  }
  getGeneralScoreSliderLabelByControlName(scoreControlName: string){
    return CreateReviewFormConfig.scoreLabelMapping[scoreControlName]
  }
}
