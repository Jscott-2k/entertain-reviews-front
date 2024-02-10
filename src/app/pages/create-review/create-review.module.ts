import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateReviewComponent } from './create-review.component';
import { ConsentStepComponent } from './review-form/consent-step/consent-step.component';
import { GameDetailsStepComponent } from './review-form/game-details-step/game-details-step.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { WrittenReviewStepComponent } from './review-form/written-review-step/written-review-step.component';
import { GeneralScoreStepComponent } from './review-form/general-score-step/general-score-step.component';
import { ProsConsStepComponent } from './review-form/pros-cons-step/pros-cons-step.component';
import { PreviewStepComponent } from './review-form/preview-step/preview-step.component';
import { TechnicalReviewStepComponent } from './review-form/technical-review-step/technical-review-step.component';
import { FormStepComponent } from './form-step/form-step.component';

@NgModule({
  declarations: [
    CreateReviewComponent,
    ConsentStepComponent,
    GameDetailsStepComponent,
    WrittenReviewStepComponent,
    GeneralScoreStepComponent,
    ProsConsStepComponent,
    TechnicalReviewStepComponent,
    PreviewStepComponent,
    FormStepComponent,
  ],
  imports: [
    CoreModule,
    CommonModule,
    SharedModule,
  ],
  exports: [
    CreateReviewComponent,
    ConsentStepComponent,
    GameDetailsStepComponent,
    WrittenReviewStepComponent,
    GeneralScoreStepComponent,
    ProsConsStepComponent,
    TechnicalReviewStepComponent,
    PreviewStepComponent,
  ]
})
export class CreateReviewModule { }
