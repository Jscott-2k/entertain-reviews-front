import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateReviewComponent } from './create-review/create-review.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateReviewModule } from './create-review/create-review.module';


import { 
  AccountHistoryComponent,
  AccountSettingsComponent,
  AdvancedSearchComponent,
  HomeComponent,
  NewsComponent,
  ReviewListComponent
} from './index';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { GameReviewComponent } from './game-review/game-review.component';

@NgModule({
  declarations: [
    ProfileComponent,
    HomeComponent,
    NewsComponent,
    ReviewListComponent,
    AccountHistoryComponent,
    AccountSettingsComponent,
    AdvancedSearchComponent,
    GameDetailComponent,
    GameReviewComponent
  ],
  imports: [
    CoreModule,
    CreateReviewModule,
    SharedModule,
    CoreModule
  ],
  exports: [
    ProfileComponent,
    HomeComponent,
    NewsComponent,
    ReviewListComponent,
    AccountHistoryComponent,
    AccountSettingsComponent,
    AdvancedSearchComponent,
    CreateReviewModule
  ]
})
export class PagesModule { }
