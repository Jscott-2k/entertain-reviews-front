import { Component, Optional, SkipSelf } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { ReviewType } from 'src/app/shared/enums/review-type.enum';
import {ReviewService } from 'src/app/core/review.service';
import { IGameCard } from 'src/app/shared/interfaces/game-card.interface';

@Component({
  selector: 'app-entertainment-list',
  templateUrl: './entertainment-list.component.html',
  styleUrls: ['./entertainment-list.component.scss']
})
export class EntertainmentListComponent {
  cardType!:ReviewType;
  reviewedGames$!: Observable<IGameCard[]> | undefined;

  cardTypeParam: string = "";
  cardTypeRep:string = ""
  platforms:string[] = [];

  constructor(private reviewService:ReviewService, private route:ActivatedRoute){}

  ngOnInit(){
    this.route.paramMap.pipe(
      switchMap((routeParams: ParamMap) => {
        this.cardTypeParam = routeParams.get('type') || "";
        this.platforms = [];
        this.reviewedGames$ = undefined;
        return this.route.queryParams;
      })
    ).subscribe((queryParams: Params) => {
      if (this.cardTypeParam === "games") {
        this.cardTypeRep = ReviewType[ReviewType.Game];
        this.cardType = ReviewType.Game;
        this.platforms = (queryParams['platforms'] || "any").split(';');
        this.reviewService.getReviewedGames(this.platforms);
        this.reviewedGames$ = this.reviewService.getReviewedGameCards$();
      }
      if(this.cardTypeParam === "movies"){
        this.cardTypeRep =  ReviewType[ReviewType.Movie];
        this.cardType = ReviewType.Movie;
      }
      if(this.cardTypeParam === "tv"){
        this.cardTypeRep =  ReviewType[ReviewType.TV];
        this.cardType = ReviewType.TV;
      }
    });
  }
}
