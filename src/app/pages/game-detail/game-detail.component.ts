import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  combineLatest,
  map,
} from 'rxjs';
import { GameService } from 'src/app/core/game.service';
import { IgdbImageService } from 'src/app/core/igdb-image.service';
import { ReviewService } from 'src/app/core/review.service';
import { GameScoresModel } from 'src/app/models/game-scores.model';
import { GameScreenshotModel } from 'src/app/models/game-screenshot.model';
import { GameModel } from 'src/app/models/game.model';
import { ReviewModel } from 'src/app/models/review.model';
import { IgdbImageSize } from 'src/app/shared/enums/igdb-image-size.enum';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from 'src/app/core/user.service';
import { AuthService } from 'src/app/core/auth.service';
import { UserModel } from 'src/app/models/user.model';
import { ReviewInteractionType } from 'src/app/shared/enums/review-interaction-type.enum';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss'],
})
export class GameDetailComponent implements OnInit, OnDestroy {
  gameID: number = -1;
  game$!: Observable<GameModel>;
  gameScores$!: Observable<GameScoresModel>;
  screenshots$!: Observable<GameScreenshotModel[]>;
  gameDetails$!: Observable<{
    game: GameModel;
    gameScores: GameScoresModel;
    reviews: ReviewModel[];
    screenshots: GameScreenshotModel[];
  }>;
  imageCoverURL!: string;
  screenshotURLs!: string[];
  gameDetailsSubscription!: Subscription;

  user!: UserModel | null;
  private userSubscription!: Subscription;
  private readonly _snackbarDuration = 2;

  get validCurrentUser(): boolean {
    return this.authService.isLoggedIn() && !!this.user;
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private reviewService: ReviewService,
    private igdbImageService: IgdbImageService,
    private userService: UserService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.setGameIDFromRoute();
    this.fetchGameDetails();
    this.userSubscription = this.userService
      .loadActiveUser()
      .subscribe((user) => {
        this.user = user;
      });
  }

  ngOnDestroy(): void {
    this.gameDetailsSubscription.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
    this.userSubscription.unsubscribe();
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
  private fetchScreenshots(gameID: number): Observable<GameScreenshotModel[]> {
    return this.gameService.fetchScreenshots(gameID);
  }
  private fetchGameDetails(): void {
    this.gameDetails$ = combineLatest({
      game: this.fetchGame(this.gameID),
      gameScores: this.fetchGameScores(this.gameID),
      reviews: this.fetchReviews(this.gameID),
      screenshots: this.fetchScreenshots(this.gameID),
    }).pipe(
      map(({ game, gameScores, reviews, screenshots }) => ({
        game,
        gameScores,
        reviews,
        screenshots,
      }))
    );
    this.gameDetailsSubscription = this.gameDetails$.subscribe((details) => {
      this.imageCoverURL = this.igdbImageService.getImageUrl(
        details.game.cover.image_id,
        IgdbImageSize.CoverBig
      );
      this.screenshotURLs = [
        ...details.screenshots.flatMap((screenshot) =>
          this.igdbImageService.getImageUrl(
            screenshot.image_id,
            IgdbImageSize.Original
          )
        ),
      ];
    });
  }

  share(): void {
    this.snackBar.open("Copied link to clipboard!","❌",{duration:this._snackbarDuration * 1000})
  }

  toggleInteraction(type: ReviewInteractionType, reviewId: number): void {
    if (this.isInteraction(type, reviewId)) {
      this.undoInteraction(type, reviewId);
    } else {
      this.interaction(type, reviewId);
    }
    this.updateUserAndReview();
  }

  interaction(type: ReviewInteractionType, reviewId: number): void {
    if (!this.user) {
      return;
    }
    this.user[type].push(reviewId);
  }

  undoInteraction(type: ReviewInteractionType, reviewId: number): void {
    if (!this.user) {
      return;
    }
    this.user[type] = this.user[type].filter((id: number) => id !== reviewId);
  }

  isInteraction(type: ReviewInteractionType, reviewId: number): boolean {
    if (!this.user) {
      return false;
    }
    return this.user[type].includes(reviewId);
  }


  updateUserAndReview(): void {
    if (this.user) {
      this.userService.updateUser(this.user).subscribe(() => {
        // TODO: Update review
      });
    }
  }
  toggleLike(reviewId: number): void {
    this.toggleInteraction(ReviewInteractionType.Like, reviewId);
  }

  toggleDislike(reviewId: number): void {
    this.toggleInteraction(ReviewInteractionType.Dislike, reviewId);
  }

  toggleMarkHelpful(reviewId: number): void {
    this.toggleInteraction(ReviewInteractionType.Helpful, reviewId);
  }

  isLiked(reviewId: number): boolean {
    return this.isInteraction(ReviewInteractionType.Like, reviewId);
  }

  isDisliked(reviewId: number): boolean {
    return this.isInteraction(ReviewInteractionType.Dislike, reviewId);
  }

  isHelpful(reviewId: number): boolean {
    return this.isInteraction(ReviewInteractionType.Helpful, reviewId);
  }

  hasUser(): boolean {
    return !!this.user;
  }
}
