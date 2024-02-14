import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { ReviewService } from './review.service';
import { GameService } from './game.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [AuthService, ReviewService, GameService]
})
export class CoreModule { }
