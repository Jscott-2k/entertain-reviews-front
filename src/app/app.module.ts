import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { environment } from '../../environments/environment'; // Import the environment (make sure file env replacements are correct)

import { CoreModule } from './core/core.module';
import { CommonModule } from '@angular/common';
import { PagesModule } from './pages/pages.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    PagesModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.googleProvider),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
