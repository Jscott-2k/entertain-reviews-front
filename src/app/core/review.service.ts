import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { GameModel } from 'src/app/models/game.model';
import { ApiService } from './api.service';
import { ReviewModel } from '../models/review.model';
import { ReviewedGameModel } from '../models/reviewed-game.model';
import { ReviewScoreModel } from '../models/review-score.model';
import { ReviewProConModel } from '../models/review-pro-con.model';
import { CreateReviewDTO } from '../shared/interfaces/create-review-dto.interface';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private reviews: any[] = []; // Array to store reviews (replace with actual model)
  private reviewedGamesSubject: BehaviorSubject<GameModel[]> = new BehaviorSubject<GameModel[]>([]);
  reviewedGames$:Observable<GameModel[]> = this.reviewedGamesSubject.asObservable();

  constructor(private apiService:ApiService) {  }
  
  private filterPlatform(selectedPlatforms:string[], responseArray:ReviewedGameModel[]){

    if (!selectedPlatforms || selectedPlatforms.length === 0 || selectedPlatforms.includes("any")) {
      return responseArray;
    }
    const selectedPlatformNumbers = selectedPlatforms.map(Number);
    return responseArray.filter((responseObj) => {
      if (responseObj.platforms) {
        // Check if any of the selected platform numbers exist in the responseObj.platforms array
        return responseObj.platforms.some((platform) => selectedPlatformNumbers.includes(platform.id));
      }
      return false;
    });
    
  }

  fetchReviewedGames(selectedPlatforms: string[]): Observable<ReviewedGameModel[]>{
    return this.apiService.post<ReviewedGameModel[]>("reviewed-games").pipe(
      map((responseArray: ReviewedGameModel[]) => this.filterPlatform(selectedPlatforms, responseArray)),
      catchError(error => {
        console.error('Error fetching reviewed games:', error);
        throw error;
      })
    );
  }

  fetchReviewsSnippet(gameID:number, pageIndex:number, pageSize:number):Observable<ReviewModel[]>{ 
    let data = {
      gameID: gameID,
      pageIndex: pageIndex,
      pageSize: pageSize
    };

    return this.apiService.post<ReviewModel[]>('review-snippets', data);
  }

  fetchReview(reviewID:number):Observable<ReviewModel>{ 
    let data = {
      reviewID: reviewID
    };
    return this.apiService.post<ReviewModel>('review', data);
  }

  searchGameByName(){}
  searchMovieByName(){}
  searchTVByName(){}

  deleteReview(){}
  
  createReview(
    createReviewData: CreateReviewDTO): Observable<any> {
    
    this.apiService.post("create-review", createReviewData);

    this.reviews.push(createReviewData.reviewData);
    console.info(createReviewData.reviewData);

    return of({ success: true, message: 'Review posted successfully' });
  }
}