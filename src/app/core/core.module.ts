import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { ReviewService } from './review.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [AuthService, ReviewService]
})
export class CoreModule { }
