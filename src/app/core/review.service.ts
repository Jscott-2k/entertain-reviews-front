import { Injectable } from '@angular/core';
import { Observable, Subject, map, of } from 'rxjs';
import { IGameCard } from 'src/app/shared/interfaces/game-card.interface';
import { GameModel } from 'src/app/models/game.model';
import { ApiService } from './api.service';
import { IgdbImageService } from './igdb-image.service';
import { IgdbImageSize } from '../shared/enums/igdb-image-size.enum';
import { ReviewModel } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private reviews: any[] = []; // Array to store reviews (replace with actual model)

  private reviewedGameCardsSubject = new Subject<IGameCard[]>();
  
  constructor(private apiService:ApiService, private igdbImageService: IgdbImageService) {  }
  
  private filterPlatform(selectedPlatforms:string[], responseArray:GameModel[]){
    if(selectedPlatforms.length == 0 || selectedPlatforms.includes("any")){

      return responseArray;
    }
    return responseArray.filter((responseObj) => {
      
      if (responseObj.platforms) {
        return responseObj.platforms.some((platform) => platform.id && selectedPlatforms.some(selectedPlatform=>selectedPlatform == platform.id));
      }
      return false;
    });
    
  }

  private mapResponseToGameCard(response:GameModel[]):IGameCard[]{

    return response.map(
      ({ name, summary, id, platforms, first_release_date, cover }) => ({
      title: name,
      id:id,
      summary:summary,
      platforms: platforms?.flatMap(({ abbreviation }) => abbreviation ?? "") ?? [],
      firstReleaseDate: first_release_date,
      coverImageURL: this.igdbImageService.getImageUrl(cover?.image_id,IgdbImageSize.CoverBig)
    }));
  }

  async getReviewedGames(selectedPlatforms:string[]):Promise<any> {
    return this.apiService.post<GameModel[]>("review-games").pipe(
      map((responseArray:GameModel[]) => this.filterPlatform(selectedPlatforms,responseArray))).subscribe((response:GameModel[]) => {
        const gamesCards:IGameCard[] = this.mapResponseToGameCard(response);
        this.reviewedGameCardsSubject.next(gamesCards);
      });
  }
  getReviewedGameCards$():Observable<IGameCard[]>{
    return this.reviewedGameCardsSubject.asObservable();
  }

  getReviewsSnippet(gameID:number, pageIndex:number, pageSize:number):Observable<ReviewModel[]>{ 
    let data = {
      gameID: gameID,
      pageIndex: pageIndex,
      pageSize: pageSize
    };

    return this.apiService.post<ReviewModel[]>('review-snippets', data);
  }

  getReview(reviewID:number):Observable<ReviewModel>{ 
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