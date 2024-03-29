import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { AutoCompleteComponent } from 'src/app/shared/components/auto-complete/auto-complete.component';
import {
  CustomErrorStateMatcher,
  CustomValidators,
} from 'src/app/shared/custom.validation';
import { errorMessageMap } from 'src/app/shared/interfaces/error.interface';
import { SelectConfig } from 'src/app/shared/interfaces/select.interface';
import { SliderConfig } from 'src/app/shared/interfaces/slider-config.interface';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { CreateReviewFormService } from './services/create-review-form.service';
import { CreateReviewLogicService } from './services/create-review-logic.service';
import { CreateReviewUiService } from './services/create-review-ui.service';

import { CreateReviewFormConfig } from './review-form/create-review-form-config';
import { ReviewService } from 'src/app/core/review.service';

import { ConsentStepComponent } from './review-form/consent-step/consent-step.component';
import { CreateReviewDTO } from 'src/app/shared/interfaces/create-review-dto.interface';
import { UserService } from 'src/app/core/user.service';
import { UserModel } from 'src/app/models/user.model';
import { AuthWrapperComponent } from 'src/app/shared/components/auth-wrapper/auth-wrapper.component';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.scss'],
  providers: [
    CreateReviewFormService,
    CreateReviewUiService,
    CreateReviewLogicService,
  ],
})
export class CreateReviewComponent implements OnInit, OnDestroy {
  mainform!: FormGroup;
  errorStateMatcher = new CustomErrorStateMatcher();

  private _subscriptions: Subscription[] = [];
  private _user!: UserModel | null;
  
  @ViewChild(AuthWrapperComponent, { static: true }) authWrapperRef!: AuthWrapperComponent;
  
  constructor(
    private formBuilder: FormBuilder,
    private formService: CreateReviewFormService,
    private logicService: CreateReviewLogicService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.mainform = this.formService.buildMainForm();
    this.mainform.updateValueAndValidity();
    this._user = null;
    this._subscriptions.push(
      this.authWrapperRef.user$.subscribe((user) => {
        this._user = user;
      })
    );
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
    return CreateReviewFormConfig.writtenReviewWordCountRequired;
  }

  // Define a method to update validators and validity
  updateValidatorsAndValidity(scores: { w: number; u: number }) {
    this.mainform.setValidators(
      CustomValidators.overallScoreValidator(scores.w, scores.u, 0, 10)
    );
    this.mainform.updateValueAndValidity();
  }
  updateScores() {
    this.logicService.updateScores();
  }
  postReview(event: Event) {
    event.preventDefault();
    if (this.mainform.valid && this._user) {
      let createReviewDTO: CreateReviewDTO = this.formService.createDTO();

      // set author and date
      createReviewDTO.reviewData.date = Math.floor(new Date().getTime() / 1000);
      createReviewDTO.reviewData.author = this._user.display
      // Set scores
      createReviewDTO.reviewData.overall_unweighted = this.logicService.overallUnweighted;
      createReviewDTO.reviewData.overall_weighted = this.logicService.overallWeighted;
      createReviewDTO.reviewData.general_weighted = this.logicService.generalWeighted;
      createReviewDTO.reviewData.general_unweighted = this.logicService.generalUnweighted;

      console.log(
        'create review DTO \n',
        createReviewDTO,
        ' FROM form ',
        this.mainform.value
      );

      this.reviewService.createReview(createReviewDTO).subscribe({
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
