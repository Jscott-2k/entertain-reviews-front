import { Component, Optional, SkipSelf } from '@angular/core';
import { ReviewType } from 'src/app/shared/enums/review-type.enum';
import { ReviewService } from './core/review.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

}