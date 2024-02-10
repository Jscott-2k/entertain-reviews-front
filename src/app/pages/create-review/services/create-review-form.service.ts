import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/shared/custom.validation';
import { CreateReviewFormConfig } from '../review-form/create-review-form-config';

@Injectable({
  providedIn: 'root'
})
export class CreateReviewFormService {

  generalScoreGroup!: FormGroup;
  writtenReviewGroup!: FormGroup;
  consentGroup!: FormGroup;
  gameDetailsGroup!: FormGroup;
  prosConsGroup!: FormGroup;
  technicalGroup!: FormGroup;
  previewGroup!: FormGroup;
  submitGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  buildMainForm() {
    this.writtenReviewGroup = this.buildWrittenReviewForm();
    this.generalScoreGroup = this.buildGeneralScoreForm();
    this.generalScoreGroup.setValidators(CustomValidators.atLeastOneImportanceSliderGreaterThanZero());

    this.previewGroup = this.buildPreviewForm();
    this.consentGroup = this.buildConsentForm();
    this.consentGroup.updateValueAndValidity();

    this.gameDetailsGroup = this.buildGameDetailsForm();
    this.gameDetailsGroup.updateValueAndValidity();

    this.technicalGroup = this.buildTechnicalForm();
    this.prosConsGroup = this.buildProConsForm();
    this.submitGroup = this.buildSubmitForm();

    const form = this.formBuilder.group({
      consentGroup: this.consentGroup,
      gameDetailsGroup: this.gameDetailsGroup,
      writtenReviewGroup: this.writtenReviewGroup,
      generalScoreGroup: this.generalScoreGroup,
      proConsGroup: this.prosConsGroup,
      technicalGroup: this.technicalGroup,
      previewGroup: this.previewGroup,
      submitGroup: this.submitGroup
    });
    // form.setValidators(CustomValidators.overallScoreValidator(this._overallWeightedScore, this._overallUnweightedScore, 0, 10));
    return form;
  }
  private buildSubmitForm() {
    return this.formBuilder.group({
    });
  }

  private buildConsentForm() {
    return this.formBuilder.group({
      ConsentCheckbox: [false, [Validators.requiredTrue]]
    });
  }
  private buildGameDetailsForm() {
    return this.formBuilder.group({
      GameAutoComplete: ["", [Validators.required]],
      PlatformAutoComplete: ["", [Validators.required]],
      TotalPlaytime: ["", [Validators.required, Validators.min(1), Validators.pattern("^[1-9][0-9]*$"), Validators.minLength(1)]]
    });
  }
  private buildProConsForm() {
    return this.formBuilder.group({
      prosList: this.formBuilder.array([]),
      consList: this.formBuilder.array([]),
    });
  }

  private buildTechnicalForm() {
    return this.formBuilder.group({
      TechnicalReview: ['', [Validators.maxLength(10000)]],
      TechnicalReviewScoreModifier: [0]
    });
  }
  private buildPreviewForm() {
    return this.formBuilder.group({});
  }

  /**
   * Builds a FormGroup containing score and weight controls for general scores.
   * Each score and its corresponding weight are paired based on their indices.
   *
   * @returns {FormGroup} The constructed form group.
   */
  private buildGeneralScoreForm(): FormGroup {

    const formGroupScoreConfig = CreateReviewFormConfig.scoreControlNames
      .reduce((config, scoreControlName, index) => {
        const weightControlName = CreateReviewFormConfig.weightControlNames[index];
        config[scoreControlName] = [0];
        config[weightControlName] = [10];
        return config;
      }, {} as { [key: string]: any });

    return this.formBuilder.group(formGroupScoreConfig);
  }

  private buildWrittenReviewForm(): FormGroup {
    return this.formBuilder.group({
      WrittenReview: ['', [Validators.required,
      Validators.maxLength(10000), CustomValidators.minWordCount(CreateReviewFormConfig.writtenReviewWordCountRequired)]]
    });
  }

  get prosList(): FormArray {
    return this.prosConsGroup.get('prosList') as FormArray;
  }
  get consList(): FormArray {
    return this.prosConsGroup.get('consList') as FormArray;
  }

  get prosListControlsGroup(): AbstractControl[] {
    return this.prosList?.controls
  }
  get consListControlsGroup(): AbstractControl[] {
    return this.consList?.controls
  }

}