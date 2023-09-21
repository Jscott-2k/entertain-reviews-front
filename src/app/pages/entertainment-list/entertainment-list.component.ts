import { Component, Optional, SkipSelf } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { ReviewType } from 'src/app/shared/enums/review-type.enum';
import {ReviewService } from 'src/app/core/review.service';
import { IGameDisplay } from 'src/app/shared/interfaces/game-display.interface';

@Component({
  selector: 'app-entertainment-list',
  templateUrl: './entertainment-list.component.html',
  styleUrls: ['./entertainment-list.component.scss']
})
export class EntertainmentListComponent {
  cardTypes = ReviewType;
  reviewedGames$!: Observable<IGameDisplay[]>;

  cardType: string = "";
  platforms:string[] = [];

  constructor(private reviewService:ReviewService, private route:ActivatedRoute){}

  ngOnInit(){
    this.route.paramMap.pipe(
      switchMap((routeParams: ParamMap) => {
        this.cardType = routeParams.get('type') || "";
        return this.route.queryParams;
      })
    ).subscribe((queryParams: Params) => {
      if (this.cardType === "games") {
        this.platforms = (queryParams['platforms'] || "any").split(';');
        this.reviewService.getReviewedGames(this.platforms);
        this.reviewedGames$ = this.reviewService.getReviewedGameCards$();
      }
    });
  }
}
