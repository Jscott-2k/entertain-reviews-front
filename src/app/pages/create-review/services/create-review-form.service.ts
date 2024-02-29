import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CustomValidators } from 'src/app/shared/custom.validation';
import { CreateReviewFormConfig } from '../review-form/create-review-form-config';
import { CreateReviewDTO } from 'src/app/shared/interfaces/create-review-dto.interface';
import { ReviewModel } from 'src/app/models/review.model';
import { ReviewScoreModel } from 'src/app/models/review-score.model';
import { ReviewProConModel } from 'src/app/models/review-pro-con.model';

@Injectable({
  providedIn: 'root',
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

  constructor(private formBuilder: FormBuilder) {}

  buildMainForm() {
    this.writtenReviewGroup = this.buildWrittenReviewForm();
    this.generalScoreGroup = this.buildGeneralScoreForm();
    this.generalScoreGroup.setValidators(
      CustomValidators.atLeastOneImportanceSliderGreaterThanZero()
    );

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
      submitGroup: this.submitGroup,
    });
    // form.setValidators(CustomValidators.overallScoreValidator(this._overallWeightedScore, this._overallUnweightedScore, 0, 10));
    return form;
  }
  private buildSubmitForm() {
    return this.formBuilder.group({});
  }

  private buildConsentForm() {
    return this.formBuilder.group({
      ConsentCheckbox: [false, [Validators.requiredTrue]],
    });
  }
  private buildGameDetailsForm() {
    return this.formBuilder.group({
      GameAutoComplete: ['', [Validators.required]],
      PlatformAutoComplete: ['', [Validators.required]],
      TotalPlaytime: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern('^[1-9][0-9]*$'),
          Validators.minLength(1),
        ],
      ],
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
      TechnicalReviewScoreModifier: [0],
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
    const formGroupScoreConfig =
      CreateReviewFormConfig.scoreControlNames.reduce(
        (config, scoreControlName, index) => {
          const weightControlName =
            CreateReviewFormConfig.weightControlNames[index];
          config[scoreControlName] = [0];
          config[weightControlName] = [10];
          return config;
        },
        {} as { [key: string]: any }
      );

    return this.formBuilder.group(formGroupScoreConfig);
  }

  private buildWrittenReviewForm(): FormGroup {
    return this.formBuilder.group({
      WrittenReview: [
        '',
        [
          Validators.required,
          Validators.maxLength(10000),
          CustomValidators.minWordCount(
            CreateReviewFormConfig.writtenReviewWordCountRequired
          ),
        ],
      ],
    });
  }

  get prosArray(): FormArray {
    return this.prosConsGroup.get('prosList') as FormArray;
  }
  get consArray(): FormArray {
    return this.prosConsGroup.get('consList') as FormArray;
  }

  get prosControls(): AbstractControl[] {
    return this.prosArray?.controls;
  }
  get consControls(): AbstractControl[] {
    return this.consArray?.controls;
  }

  createDTO(): CreateReviewDTO {
    let reviewData: ReviewModel = {
      game: this.gameDetailsGroup.get("GameAutoComplete")?.value || 0,
      id: -1, // This will be assigned later
      author: '', // Need to populate this with actual user data
      date: 0, // Need to populate this with actual unix timestamp
      playtime: parseInt(this.gameDetailsGroup.get('TotalPlaytime')?.value || 0),
      platform: this.gameDetailsGroup.get('PlatformAutoComplete')?.value || '',
      written: this.writtenReviewGroup.get('WrittenReview')?.value || '',

      overall_weighted: 0, // populated from logic serivce
      overall_unweighted: 0, // populated from logic serivce
      pros_total_modifier: 0, // populated from logic serivce
      cons_total_modifier: 0, // populated from logic serivce
      general_weighted: 0, // populated from logic serivce
      general_unweighted: 0, // populated from logic serivce
      technical_score:
        this.technicalGroup.get('TechnicalReviewScoreModifier')?.value || 0,
      technical_written:
        this.technicalGroup.get('TechnicalReview')?.value || '',
      likes: 0,
      dislikes: 0,
      helpfuls: 0,
    };

    const scoresData: ReviewScoreModel[] = CreateReviewFormConfig.scoreControlNames.map((scoreControlName, index) => {
        const weightControlName = CreateReviewFormConfig.weightControlNames[index];
        return {
          id: 0,  // This will be assigned later
          review_id: 0,  // This will be assigned later
          aspect: CreateReviewFormConfig.scoreAspectMapping[scoreControlName], 
          score: this.generalScoreGroup.get(scoreControlName)?.value || 0,
          weight: this.generalScoreGroup.get(weightControlName)?.value || 10 // Default weight to 10 if not found
        };
      });

      const prosData: ReviewProConModel[] = this.prosArray.controls.map(control => {
        return {
          id: -1,  // This will be assigned later
          review_id: -1,  // This will be assigned later
          modifier: control.get('modifier')?.value || 0,
          description: control.get('description')?.value || ''
        };
      });
  
      const consData: ReviewProConModel[] = this.consArray.controls.map(control => {
        return {
          id: -1, // This will be assigned later
          review_id: -1, // This will be assigned later
          modifier: control.get('modifier')?.value || 0,
          description: control.get('description')?.value || ''
        };
      });

    return {
      reviewData: reviewData,
      scoresData: scoresData,
      prosData: prosData,
      consData: consData,
    };
  }
}
