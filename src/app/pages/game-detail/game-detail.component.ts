import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, combineLatest, forkJoin, map } from 'rxjs';
import { GameService } from 'src/app/core/game.service';
import { ReviewService } from 'src/app/core/review.service';
import { GameScoresModel as GameScoresModel } from 'src/app/models/game-scores.model';
import { GameModel } from 'src/app/models/game.model';
import { ReviewModel } from 'src/app/models/review.model';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss'],
})
export class GameDetailComponent {
  gameID: number = -1;
  game$!: Observable<GameModel>;
  gameScores$!: Observable<GameScoresModel>;
  gameDetails$!: Observable<{ game: GameModel, gameScores: GameScoresModel, reviews: ReviewModel[] }>;
  reviews$!: Observable<ReviewModel[]>;
  private destroy$: Subject<void> = new Subject<void>();


  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.setGameIDFromRoute();
    this.fetchGameDetails();
  }

  ngOnDestroy(): void {
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
      reviews: this.fetchReviews(this.gameID)
    }).pipe(
      map(({ game, gameScores, reviews }) => ({ game, gameScores, reviews }))
    );
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
