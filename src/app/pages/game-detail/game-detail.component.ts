import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, Subscription, combineLatest, map } from 'rxjs';
import { GameService } from 'src/app/core/game.service';
import { IgdbImageService } from 'src/app/core/igdb-image.service';
import { ReviewService } from 'src/app/core/review.service';
import { GameScoresModel as GameScoresModel } from 'src/app/models/game-scores.model';
import { GameModel } from 'src/app/models/game.model';
import { ReviewModel } from 'src/app/models/review.model';
import { IgdbImageSize } from 'src/app/shared/enums/igdb-image-size.enum';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss'],
})
export class GameDetailComponent implements OnInit, OnDestroy {
  gameID: number = -1;
  game$!: Observable<GameModel>;
  gameScores$!: Observable<GameScoresModel>;
  gameDetails$!: Observable<{
    game: GameModel;
    gameScores: GameScoresModel;
    reviews: ReviewModel[];
  }>;
  imageCoverURL!: string;
  gameDetailsSubscription!: Subscription;
  reviews$!: Observable<ReviewModel[]>;
  
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private reviewService: ReviewService,
    private igdbImageService: IgdbImageService
  ) {}

  ngOnInit(): void {
    this.setGameIDFromRoute();
    this.fetchGameDetails();
  }

  ngOnDestroy(): void {
    this.gameDetailsSubscription.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  
  }

  private setGameIDFromRoute(): void {
    const gameIdParam = this.route.snapshot.paramMap.get('game');
    this.gameID = gameIdParam ? parseInt(gameIdParam) : -1;
  }
  private fetchGame(gameID: number): Observable<GameModel> {
    return this.gameService.fetchGame(gameID);
  }

  private fetchGameScores(gameID: number): Observable<GameScoresModel> {
    return this.gameService.fetchScores(gameID);
  }

  private fetchReviews(gameID: number): Observable<ReviewModel[]> {
    return this.reviewService.fetchReviewsSnippet(gameID, 0, 10);
  }

  private fetchGameDetails(): void {
    this.gameDetails$ = combineLatest({
      game: this.fetchGame(this.gameID),
      gameScores: this.fetchGameScores(this.gameID),
      reviews: this.fetchReviews(this.gameID),
    }).pipe(
      map(({ game, gameScores, reviews }) => ({ game, gameScores, reviews }))
    );
    this.gameDetailsSubscription = this.gameDetails$.subscribe((details) => {
      console.log(details.game);
      this.imageCoverURL = this.igdbImageService.getImageUrl(
        details.game.cover.image_id,
        IgdbImageSize.CoverBig
      );
    });
  }

  share(): void {
    // Implement the logic to share the game page on social media
  }

  like(reviewId: number): void {
    // Implement the logic to like a review
  }

  dislike(reviewId: number): void {
    // Implement the logic to dislike a review
  }

  markHelpful(reviewId: number): void {
    // Implement the logic to mark a review as helpful
  }
}
