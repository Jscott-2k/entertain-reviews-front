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
import { EntertainmentCardDirective } from './directives/review-card/entertainment-card.directive';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScoreClassPipe } from './pipes/score-class.pipe';
import { TextTruncatePipe } from './pipes/text-truncate.pipe';
import { AbsPipe } from './pipes/abs.pipe';
import { WordCountPipe } from './pipes/word-count.pipe';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { SelectComponent } from './components/select/select.component';
import { AutoCompleteComponent } from './components/auto-complete/auto-complete.component';
import { RangePipe } from './pipes/range.pipe';
import { RangeDirective } from './directives/range/range.directive';
import { BannerComponent } from './components/banner/banner.component';
import { ImageCarouselComponent } from './components/image-carousel/image-carousel.component';

@NgModule({
  declarations: [
    // Components
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
    CheckboxComponent,
    SelectComponent,
    TextAreaComponent,
    ToggleComponent,
    SliderComponent,
    AutoCompleteComponent,
    BannerComponent,
    ImageCarouselComponent,

    // Pipes
    PlatformSortPipe,
    ScoreClassPipe,
    TextTruncatePipe,
    AbsPipe,
    WordCountPipe,
    RangePipe,

    // Directives
    PlatformNavigationDirective,
    EntertainmentCardDirective,
    RangeDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    SharedMaterialModule,
  ],
  exports: [
    // Modules
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    SharedMaterialModule,
    ReactiveFormsModule,

    // Components
    CheckboxComponent,
    AppComponent,
    RatingComponent,
    EntertainmentCardComponent,
    GameCardComponent,
    MovieCardComponent,
    TvCardComponent,
    HeaderComponent,
    AvatarComponent,
    AuthWrapperComponent,
    ToggleComponent,
    SliderComponent,
    SelectComponent,
    AutoCompleteComponent,
    BannerComponent,
    ImageCarouselComponent,

    // Pipes
    AbsPipe,
    RangePipe,
    WordCountPipe,
    TextTruncatePipe,

    // Directives
    EntertainmentCardDirective,
    RangeDirective,
  ],
})
export class SharedModule {}
