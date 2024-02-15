import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { GameModel } from 'src/app/models/game.model';
import { ApiService } from './api.service';
import { ReviewModel } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private reviews: any[] = []; // Array to store reviews (replace with actual model)
  private reviewedGamesSubject: BehaviorSubject<GameModel[]> = new BehaviorSubject<GameModel[]>([]);
  reviewedGames$:Observable<GameModel[]> = this.reviewedGamesSubject.asObservable();

  constructor(private apiService:ApiService) {  }
  
  private filterPlatform(selectedPlatforms:string[], responseArray:GameModel[]){

    if(!selectedPlatforms || selectedPlatforms.length == 0 || selectedPlatforms.includes("any")){
      return responseArray;
    }
    return responseArray.filter((responseObj) => {
      
      if (responseObj.platforms) {
        return responseObj.platforms.some((platform) => platform.id && selectedPlatforms.some(selectedPlatform=>selectedPlatform == platform.id));
      }
      return false;
    });
    
  }

  fetchReviewedGames(selectedPlatforms: string[]): Observable<GameModel[]>{
    return this.apiService.post<GameModel[]>("review-games").pipe(
      map((responseArray: GameModel[]) => this.filterPlatform(selectedPlatforms, responseArray)),
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
  
  createReview(reviewData: any): Observable<any> {

    this.apiService.post("create-review");

    this.reviews.push(reviewData);
    console.info(reviewData);

    return of({ success: true, message: 'Review posted successfully' });
  }
}