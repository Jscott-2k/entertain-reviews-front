import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { ReviewService } from './review.service';
import { GameService } from './game.service';
import { PlatformService } from './platform.service';
import { UserService } from './user.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [AuthService, ReviewService, GameService, PlatformService, UserService]
})
export class CoreModule { }
