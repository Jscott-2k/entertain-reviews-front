import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  ParamMap,
  Router,
} from '@angular/router';
import { Observable, Subject, catchError, filter, of, switchMap, takeUntil, throwError } from 'rxjs';
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
import { PlatformService } from 'src/app/core/platform.service';

@Component({
  selector: 'app-entertainment-list',
  templateUrl: './entertainment-list.component.html',
  styleUrls: ['./entertainment-list.component.scss'],
})
export class EntertainmentListComponent implements OnInit, OnDestroy {
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
    private igdbImageService: IgdbImageService,
    private platformService:PlatformService,
    private router: Router
  ) {}

  private _destroy$ = new Subject<void>();
  private readonly _reviewStrategies: Record<
    EntertainmentType,
    IEntertainmentStrategy<IEntertainmentResponseModel, IFetchRequestParams>
  > = {
    game: new GameStrategy(this.reviewService, this.platformService, this.igdbImageService),
    movie: new TVStrategy(this.reviewService),
    tv: new MovieStrategy(this.reviewService),
  };

  ngOnInit() {
    this.initEntertainmentList();

    // Subscribe to route changes
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this._destroy$)
      )
      .subscribe(() => {
        this.initEntertainmentList(); // Reinitialize the entertainment list to coincide the route change
      });
  }
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private initEntertainmentList() {
    this.route.paramMap.pipe(
      switchMap((routeParams: ParamMap) => this.fetchReviewedList(routeParams)),
      switchMap((data: any) => this.fetchEntertainmentCards(data)),
      takeUntil(this._destroy$)
    ).subscribe({
      next: (cards) => {
        this.reviewedEntertainmentCards = cards;
      },
      error: (error) => {
        console.error('Error initializing entertainment list:', error);
      }
    });
  }
  
  private fetchEntertainmentCards(data: any): Observable<any> {
    return this._strategy.fetchCards(data).pipe(
      catchError((error: any) => {
        console.error('Error fetching cards:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Fetches the reviewed entertainment list based on the route parameters.
   * @param routeParams Route parameters containing the type of entertainment.
   * @returns Observable of the reviewed entertainment list.
   */
  private fetchReviewedList(
    routeParams: ParamMap
  ): Observable<IEntertainmentResponseModel[]> {
    if (!routeParams)
      throw new Error(`Invalid route paramters. 'type' required`);
    this.configureReviewListStrategy(routeParams);
    return this._strategy ? this._strategy.fetchReviewed() : of([]);
  }

  /**
   * Configures the review list strategy based on the route parameters.
   * @param routeParams Route parameters containing the type of entertainment.
   */
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

  /**
   * Retrieves the fetch parameters based on the entertainment type.
   * @returns Fetch parameters for the entertainment type.
   */
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

  /**
   * Retrieves the platforms from the route query parameters.
   * @returns Array of platforms.
   */
  private getPlatforms(): string[] {
    return this.route.snapshot.queryParamMap.get('platforms')?.split(';') ?? [];
  }
}
