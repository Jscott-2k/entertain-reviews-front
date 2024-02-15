import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GameModel } from 'src/app/models/game.model';
import { ReviewProConModel } from 'src/app/models/review-pro-con.model';
import { ReviewModel } from 'src/app/models/review.model';

@Component({
  selector: 'app-game-review',
  templateUrl: './game-review.component.html',
  styleUrls: ['./game-review.component.scss'],
})
export class GameReviewComponent {


  scores!: MatTableDataSource<any>;

  game!: GameModel; // the game object to display
  review!: ReviewModel; // the array of reviews for the game
  pageEvent!: PageEvent; // the pagination event object

  pros!:ReviewProConModel[];
  cons!:ReviewProConModel[];

  share() {
    throw new Error('Method not implemented.');
  }
  getScoreWeight(_t64: any) {
    throw new Error('Method not implemented.');
  }

  getScoreValue(_t64: any) {
    throw new Error('Method not implemented.');
  }
}
