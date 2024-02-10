import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { AutoCompleteComponent } from 'src/app/shared/components/auto-complete/auto-complete.component';
import { CustomErrorStateMatcher, CustomValidators } from 'src/app/shared/custom.validation';
import { errorMessageMap } from 'src/app/shared/interfaces/error.interface';
import { SelectConfig } from 'src/app/shared/interfaces/select.interface';
import { SliderConfig } from 'src/app/shared/interfaces/slider-config.interface';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { CreateReviewFormService } from './services/create-review-form.service';
import { CreateReviewLogicService } from './services/create-review-logic.service';
import { CreateReviewUiService } from './services/create-review-ui.service';

import { scoreControlNames, weightControlNames, scoreLabelMapping, weightLabelMapping } from './create-review-config';
import { ReviewService } from 'src/app/core/review.service';

import { ConsentStepComponent } from './review-form/consent-step/consent-step.component';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.scss'],
  providers: [CreateReviewFormService, CreateReviewUiService, CreateReviewLogicService],
})
export class CreateReviewComponent implements OnInit, OnDestroy {

  mainform!: FormGroup;
  errorStateMatcher = new CustomErrorStateMatcher();

  weightedAverageValue$: Observable<number> | undefined;
  unweightedAverageValue$: Observable<number> | undefined;

  prosTotalModifier$: Observable<number> | undefined;
  consTotalModifier$: Observable<number> | undefined;

  private _overallWeightedScore: number = 0;
  private _overallUnweightedScore: number = 0;

  private _scoreToWeightMapping: { [key: string]: string } = {};
  private _generalScoreLabelObject: { [key: string]: { label: string } } | null = null;
  private _allGeneralScoreSliderKeys: string[] | null = null;

  private _subscriptions: Subscription[] = [];

  scoreSliderDataSource!: MatTableDataSource<string>;

  constructor(private formBuilder: FormBuilder,
    private formService: CreateReviewFormService,
    private uiService: CreateReviewUiService,
    private logicService: CreateReviewLogicService,
    private reviewService: ReviewService) {
  }

  ngOnInit(): void {
    this.mainform = this.formService.buildMainForm()
    this.mainform.updateValueAndValidity();

    this.initScoreWeightMapping();
    this.initScoreSliderControls();

    this.subscribeToSliderChanges();
    this.subscribeToProConListChanges();
    this.subscribeToTechnicalModifierChanges();
    this.subscribeToLogicService();

    this.scoreSliderDataSource = new MatTableDataSource<string>(scoreControlNames);

  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((subscription) => subscription.unsubscribe());
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
  get previewGroup(): FormGroup {
    return this.formService.previewGroup;
  }
  get submitGroup(): FormGroup {
    return this.formService.submitGroup;
  }
  get writtenReviewWordCountRequired(): number {
    return this.formService.WrittenReviewWordCountRequired;
  }

  private initScoreWeightMapping(): void {
    if (scoreControlNames.length !== weightControlNames.length) {
      console.error('Score and weight control names arrays should have the same length.');
      return;
    }

    for (let i = 0; i < scoreControlNames.length; i++) {
      const scoreControlName = scoreControlNames[i];
      const weightControlName = weightControlNames[i];
      this._scoreToWeightMapping[scoreControlName] = weightControlName;
    }
  }

  getGeneralScoreSliderControl(name: string): FormControl {
    return this.formService.generalScoreGroup.get(name) as FormControl;
  }

  // Add a new pro to the list
  addPro() {
    const newProControl = this.formBuilder.group({
      description: ['', [Validators.required, Validators.maxLength(250)]],
      modifier: [0, Validators.required],
    });

    this.prosList.push(newProControl);
  }

  // Add a new con to the list
  addCon() {
    const newConControl = this.formBuilder.group({
      description: ['', [Validators.required, Validators.maxLength(250)]],
      modifier: [0, Validators.required],
    });
    this.consList.push(newConControl);
  }

  removePro(index: number): void {
    (this.formService.prosConsGroup.get('prosList') as FormArray).removeAt(index);
  }

  removeCon(index: number): void {
    (this.formService.prosConsGroup.get('consList') as FormArray).removeAt(index);
  }

  private get prosList(): FormArray {
    return this.formService.prosConsGroup.get('prosList') as FormArray;
  }
  private get consList(): FormArray {
    return this.formService.prosConsGroup.get('consList') as FormArray;
  }

  get prosListControlsGroup(): AbstractControl[] {
    return this.prosList?.controls
  }
  get consListControlsGroup(): AbstractControl[] {
    return this.consList?.controls
  }
  // Define a method to update validators and validity
  private updateValidatorsAndValidity() {
    this.mainform.setValidators(CustomValidators.overallScoreValidator(
      this._overallWeightedScore,
      this._overallUnweightedScore,
      0,
      10
    ));
    this.mainform.updateValueAndValidity();
  }

  get overallWeightedScore(): number {
    return this._overallWeightedScore;
  }
  get overallUnweightedScore(): number {
    return this._overallUnweightedScore;
  }

  calculateProsModifier(): number {
    return this.logicService.updateProsModifier(this.prosListControlsGroup);
  }

  calculateConsModifier(): number {
    return this.logicService.updateConsModifier(this.consListControlsGroup);
  }

  get ScoreSliderConfig(): SliderConfig {
    return {
      minValue: 0,
      maxValue: 10,
      stepValue: .25,
    }
  }
  get technicalReviewScoreModifier() {
    return this.formService.technicalGroup.get('TechnicalReviewScoreModifier')?.value || 0
  }

  private updateScores() {
    this.logicService.updateScores(this.prosListControlsGroup, this.consListControlsGroup, this.technicalReviewScoreModifier, this.formService.generalScoreGroup);
  }

  subscribeToProConListChanges() {
    this.prosListControlsGroup.forEach((group) => {
      if (group.get("modifier")) {
        const subscription = group.valueChanges.subscribe(() => {
          this.updateScores();
        });
        this._subscriptions.push(subscription);
      }
    });

    this.consListControlsGroup.forEach((group) => {
      if (group) {
        const subscription = group.valueChanges.subscribe(() => {
          this.updateScores();
        });
        this._subscriptions.push(subscription);
      }
    });

  }

  subscribeToTechnicalModifierChanges() {

    let scoreModifierControl = this.formService.technicalGroup.get('TechnicalReviewScoreModifier');
    if (scoreModifierControl) {
      this._subscriptions.push(
        scoreModifierControl.valueChanges.subscribe(() => {
          this.updateScores();
        }));
    } else {
      console.error("Failed to get TechnicalReviewScoreModifier in subscribeToTechnicalModifierChanges call");
    }
  }

  subscribeToSliderChanges(): void {
    this.generalScoreSliders.forEach((controlName) => {
      const control = this.formService.generalScoreGroup.get(controlName);
      if (control) {
        const subscription = control.valueChanges.subscribe(() => {
          this.updateScores();
        });
        this._subscriptions.push(subscription);
      }
    });
  }
  subscribeToLogicService() {
    this._subscriptions.push(this.logicService.overallWeightedScore$.subscribe(overallWeightedScore => {
      this._overallWeightedScore = overallWeightedScore;
      this.updateValidatorsAndValidity();
    }));
    this._subscriptions.push(
      this.logicService.overallUnweightedScore$.subscribe(overallUnweightedScore => {
        this._overallUnweightedScore = overallUnweightedScore;
        this.updateValidatorsAndValidity();
      }));

    this.prosTotalModifier$ = this.logicService.prosModifier$;
    this.consTotalModifier$ = this.logicService.consModifier$;

    this.unweightedAverageValue$ = this.logicService.unweightedAverageValue$;
    this.weightedAverageValue$ = this.logicService.weightedAverageValue$;
  }


  get generalScoreSlidersLabelObject(): { [key: string]: { label: string } } | null {
    if (!this._generalScoreLabelObject) {
      console.warn('General score sliders accessed before initialization. Call initScoreSliderControls in ngOnInit.');
      return {};
    }
    return this._generalScoreLabelObject;
  }

  get generalScoreSliders(): string[] {
    if (!this._allGeneralScoreSliderKeys && !this._generalScoreLabelObject) {
      console.warn('General score sliders accessed before initialization. Call initScoreSliderControls in ngOnInit.');
      return [];
    }
    if (!this._allGeneralScoreSliderKeys) {
      this._allGeneralScoreSliderKeys = Object.keys(this._generalScoreLabelObject || {});
    }
    return this._allGeneralScoreSliderKeys;
  }

  getGeneralScoreSliderLabel(index: number): string {
    const sliderName = this.generalScoreSliders[index];
    return this.getGeneralScoreSliderLabelByControlName(sliderName);
  }

  getGeneralScoreSliderLabelByControlName(controlName: string): string {
    const sliderControl = this._generalScoreLabelObject?.[controlName];
    return sliderControl?.label || '';
  }

  private initScoreSliderControls(): { [key: string]: { label: string } } | null {
    if (!this._generalScoreLabelObject) {
      this._generalScoreLabelObject = this.buildUnifiedScoreSliderControls();
    }
    return this._generalScoreLabelObject;
  }


  private buildUnifiedScoreSliderControls(): { [key: string]: { label: string } } {

    const unifiedSliderControls: { [key: string]: { label: string } } = {};

    // Iterate through score controls and create the unified array
    scoreControlNames.forEach((scoreControlName, index) => {
      const weightControlName = weightControlNames[index];

      const scoreLabel = scoreLabelMapping[scoreControlName] || '';
      const weightLabel = weightLabelMapping[weightControlName] || '';

      // Add score control to the unified object
      unifiedSliderControls[scoreControlName] = { label: scoreLabel };

      // Add weight control to the unified object
      unifiedSliderControls[weightControlName] = { label: weightLabel };

    });

    return unifiedSliderControls;
  }

  getWeightControlValue(scoreControlName: string): number | null {
    if (!this.generalScoreGroup) {
      console.error('generalScoreGroup is not initialized.');
      return null;
    }

    const weightControlName = this._scoreToWeightMapping[scoreControlName];

    if (!weightControlName) {
      console.error(`Weight control not found for ${scoreControlName}.`);
      return null;
    }

    const weightControl = this.generalScoreGroup.get(weightControlName);

    if (!weightControl) {
      console.error(`Weight control ${weightControlName} not found in generalScoreGroup.`);
      return null;
    }

    return weightControl.value;
  }

  getControl(group: FormGroup, controlName: string) {
    return group.get(controlName) as FormControl;
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
    if (group.get(controlName)?.invalid) {
      return true;
    }
    return false;
  }

  postReview(event: Event) {
    event.preventDefault();
    if (this.mainform.valid) {
      this.reviewService.createReview(this.mainform.value).subscribe({
        next: (response: any) => {
          console.log('Review posted successfully:', response);
          // Handle success - navigate to a success page or perform other actions
        },
        error: (error: any) => {
          console.error('Error posting review:', error);
          // Handle error, show a message to the user, etc.
        },
      });
    } else {
      console.error('Form is invalid. Please check the form for errors.');
    }
  }
  
}