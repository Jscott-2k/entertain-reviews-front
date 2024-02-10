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
  ReviewDetailedComponent,
  ReviewListComponent
} from './index';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    ProfileComponent,
    HomeComponent,
    NewsComponent,
    ReviewListComponent,
    ReviewDetailedComponent,
    AccountHistoryComponent,
    AccountSettingsComponent,
    AdvancedSearchComponent
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
    ReviewDetailedComponent,
    AccountHistoryComponent,
    AccountSettingsComponent,
    AdvancedSearchComponent,
    CreateReviewModule
  ]
})
export class PagesModule { }
