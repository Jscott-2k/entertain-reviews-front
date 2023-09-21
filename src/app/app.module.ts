import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { CreateReviewComponent } from './pages/create-review/create-review.component';

import { SharedModule } from './shared/shared.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { 
    AccountHistoryComponent,
    AccountSettingsComponent,
    AdvancedSearchComponent,
    HomeComponent,
    NewsComponent,
    ReviewDetailedComponent,
    ReviewListComponent } from './pages';
import { CoreModule } from './core/core.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreateReviewComponent,
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
    CommonModule,
    HttpClientModule,
    SharedModule,
    CoreModule
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            process.env['googleProvider'] || ""
          )
        }
      ],
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
