import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import {
  EntertainmentType,
  isEntertainment,
} from 'src/app/shared/entertainment.type';
import { ReviewService } from 'src/app/core/review.service';
import { IgdbImageService } from 'src/app/core/igdb-image.service';
import IEntertainmentStrategy, {
  IEntertainmentCard,
  IEntertainmentResponseModel,
  IFetchRequestParams,
} from 'src/app/shared/interfaces/entertainment-strategy.interface';
import { GameStrategy } from 'src/app/core/strategies/game.strategy';
import { TVStrategy } from 'src/app/core/strategies/tv.strategy';
import { MovieStrategy } from 'src/app/core/strategies/movie.strategy';

@Component({
  selector: 'app-entertainment-list',
  templateUrl: './entertainment-list.component.html',
  styleUrls: ['./entertainment-list.component.scss'],
})
export class EntertainmentListComponent {
  cardType!: EntertainmentType;
  reviewedEntertainmentCards: IEntertainmentCard[] = [];
  entertainmentTypeParam: string = '';
  private _strategy!: IEntertainmentStrategy<
    IEntertainmentResponseModel,
    IFetchRequestParams
  >;

  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private igdbImageService: IgdbImageService
  ) {}

  private readonly _reviewStrategies: Record<
    EntertainmentType,
    IEntertainmentStrategy<IEntertainmentResponseModel, IFetchRequestParams>
  > = {
    game: new GameStrategy(this.reviewService, this.igdbImageService),
    movie: new TVStrategy(this.reviewService),
    tv: new MovieStrategy(this.reviewService),
  };

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((routeParams: ParamMap) =>
          this.fetchReviewedList(routeParams)
        )
      )
      .subscribe({
        next: (data: any) => {
          this.reviewedEntertainmentCards =
            this._strategy.getCards(data);
        },
        error: (error: any) => {
          console.error('Error fetching reviewed data:', error);
        },
      });
  }

  private fetchReviewedList(routeParams: ParamMap): Observable<IEntertainmentResponseModel[]> {
    if (!routeParams) throw new Error(`Invalid route paramters. 'type' required`);
    this.configureReviewListStrategy(routeParams);
    return this._strategy ? this._strategy.fetchReviewed() : of([]);
  }

  private configureReviewListStrategy(routeParams: ParamMap) {
    this.entertainmentTypeParam = routeParams.get('type')?.slice(0, -1) || ''; // Ignore last character 's'
    if (!isEntertainment(this.entertainmentTypeParam)) {
      throw new Error(
        `Invalid entertainment type. EntertainmentStrategy does not exist for type ${this.entertainmentTypeParam}`
      );
    }
    this.cardType = this.entertainmentTypeParam as EntertainmentType; // This is okay since we validate the type with isEntertainment(...)
    this._strategy = this._reviewStrategies[this.cardType];
    this._strategy.setDefaultParams(this.getFetchParams());
  }

  private getFetchParams(): IFetchRequestParams {
    if (!this.cardType)
      throw new Error(
        'Failed to get fetch parameters. cardType not initialized to an EntertainmentType'
      );

    switch (this.cardType) {
      case 'game':
        return { platforms: this.getPlatforms() }; // IGameFetchRequestParams
      default:
        break;
    }
    return {};
  }
  private getPlatforms(): string[] {
    return this.route.snapshot.queryParamMap.get('platforms')?.split(';') ?? [];
  }
}
