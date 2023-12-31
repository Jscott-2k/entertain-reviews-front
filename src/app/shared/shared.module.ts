import { NgModule } from '@angular/core';


import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { HeaderComponent } from './components/header/header.component';
import { RatingComponent } from './components/rating/rating.component';
import { EntertainmentCardComponent } from './components/entertainment-card/entertainment-card.component';
import { GameCardComponent } from './components/entertainment-card/game-card/game-card.component';
import { MovieCardComponent } from './components/entertainment-card/movie-card/movie-card.component';
import { TvCardComponent } from './components/entertainment-card/tv-card/tv-card.component';
import { EntertainmentCardDirective } from './directives/review-card/entertainment-card.directive'
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { AvatarComponent } from './components/avatar/avatar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { PlatformSortPipe } from './pipes/platform-sort.pipe';
import { PlatformNavigationDirective } from './directives/platform-navigation/platform-navigation.directive';
import { AuthWrapperComponent } from './components/auth-wrapper/auth-wrapper.component';
import { SharedMaterialModule } from './shared-material.module';
import { TextAreaComponent } from './components/text-area/text-area.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { SliderComponent } from './components/slider/slider.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ScoreClassPipe } from './pipes/score-class.pipe';
import { TextTruncatePipe } from './pipes/text-truncate.pipe';
import { AbsPipe } from './pipes/abs.pipe';
import { WordCountPipe } from './pipes/word-count.pipe';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { SelectComponent } from './components/select/select.component';



@NgModule({
  declarations: [
    AppComponent,
    RatingComponent,
    EntertainmentCardComponent,
    HeaderComponent,
    GameCardComponent,
    MovieCardComponent,
    TvCardComponent,
    AvatarComponent,
    LayoutComponent,
    FooterComponent,
    AuthWrapperComponent,
    PlatformSortPipe,
    PlatformNavigationDirective,
    EntertainmentCardDirective,
    TextAreaComponent,
    ToggleComponent,
    SliderComponent,
    ScoreClassPipe,
    TextTruncatePipe,
    AbsPipe,
    WordCountPipe,
    CheckboxComponent,
    SelectComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    SharedMaterialModule,
  ],
  exports:[
    BrowserModule,
    AppRoutingModule,
    CheckboxComponent,
    BrowserAnimationsModule,
    AppComponent,
    RatingComponent,
    EntertainmentCardComponent,
    GameCardComponent,
    MovieCardComponent,
    TvCardComponent,
    HeaderComponent,
    EntertainmentCardDirective,
    SocialLoginModule,
    AvatarComponent,
    AuthWrapperComponent,
    ToggleComponent,
    SliderComponent,
    SharedMaterialModule,
    ReactiveFormsModule,
    AbsPipe,
    WordCountPipe,
    SelectComponent
  ]
})
export class SharedModule { }
