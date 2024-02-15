import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { GameService } from 'src/app/core/game.service';
import { ReviewService } from 'src/app/core/review.service';
import { GameScoresModel as GameScoresModel } from 'src/app/models/game-scores.model';
import { GameModel } from 'src/app/models/game.model';
import { ReviewModel } from 'src/app/models/review.model';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent {
  gameScores!: GameScoresModel; // the game object to display
  game!: GameModel; // the game object to display
  reviews!: ReviewModel[]; // the array of reviews for the game
  pageEvent!: PageEvent; // the pagination event object
  gameID:number = -1;

  constructor(
    private route: ActivatedRoute, // to get the game id from the route
    private gameService: GameService,
    private reviewService: ReviewService
  ) { }

  ngOnInit(): void {
    this.getGameDetails(); // get the game data on initialization
  }

  getGame(): void {
    this.gameID = parseInt( this.route.snapshot.paramMap.get('id') ?? "-1" ); // get the game id from the route
    this.gameService.getGame(this.gameID) // get the game object from the service
      .subscribe(game => this.game = game); // assign the game object to the component property
  }

  getGameDetails(): void {
    this.gameID = parseInt( this.route.snapshot.paramMap.get('id') ?? "-1" ); // get the game id from the route
    this.gameService.getScores(this.gameID) // get the game object from the service
      .subscribe(gameScore => this.gameScores = gameScore); // assign the game object to the component property
  }

  getReviews(): void {
    this.reviewService.fetchReviewsSnippet(this.gameID,this.pageEvent.pageIndex, this.pageEvent.pageSize) // get the reviews array from the service
    .subscribe(reviews => this.reviews = reviews); // assign the reviews array to the component property
  }
  share(): void {
    // implement the logic to share the game page on social media
  }

  like(reviewId: number): void {
    // implement the logic to like a review
  }

  dislike(reviewId: number): void {
    // implement the logic to dislike a review
  }

  markHelpful(reviewId: number): void {
    // implement the logic to mark a review as helpful
  }
}
