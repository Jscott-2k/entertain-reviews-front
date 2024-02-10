import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateReviewComponent } from './create-review.component';
import { ConsentStepComponent } from './review-form/consent-step/consent-step.component';
import { GameDetailsStepComponent } from './review-form/game-details-step/game-details-step.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [
    CreateReviewComponent,
    ConsentStepComponent,
    GameDetailsStepComponent
  ],
  imports: [
    CoreModule,
    CommonModule,
    SharedModule,
  ],
  exports: [
    CreateReviewComponent,
    ConsentStepComponent,
    GameDetailsStepComponent
  ]
})
export class CreateReviewModule { }
