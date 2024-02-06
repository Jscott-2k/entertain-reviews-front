import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, debounceTime, filter, flatMap, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { IGameDisplay as IReviewedGameCardDisplay } from 'src/app/shared/interfaces/game-display.interface';
import { IGameResponseObject } from 'src/app/shared/interfaces/game-response-object.interface';
import { ApiService } from './api.service';
import { IgdbImageService } from './igdb-image.service';
import { IgdbImageSize } from '../shared/enums/igdb-image-size.enum';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private reviewedGameDisplayListSubject = new Subject<IReviewedGameCardDisplay[]>();
  

  constructor(private apiService:ApiService, private igdbImageService: IgdbImageService) {  }
  

  private filterPlatform(selectedPlatforms:string[], responseArray:IGameResponseObject[]){
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

  private mapResponseToGameCard(response:IGameResponseObject[]):IReviewedGameCardDisplay[]{

    return response.map(
      ({ name, summary, platforms, first_release_date, cover }) => ({
      title: name,
      summary:summary,
      platforms: platforms?.flatMap(({ abbreviation }) => abbreviation ?? "") ?? [],
      firstReleaseDate: first_release_date,
      coverImageURL: this.igdbImageService.getImageUrl(cover?.image_id,IgdbImageSize.CoverBig)
    }));
  }

  async getReviewedGames(selectedPlatforms:string[]):Promise<any> {
    return this.apiService.post<IGameResponseObject[]>("reviewgames").pipe(
      map((responseArray:IGameResponseObject[]) => this.filterPlatform(selectedPlatforms,responseArray))).subscribe((response:IGameResponseObject[]) => {
        const gamesCards:IReviewedGameCardDisplay[] = this.mapResponseToGameCard(response);
        this.reviewedGameDisplayListSubject.next(gamesCards);
      });
  }
  getReviewedGameCards$():Observable<IReviewedGameCardDisplay[]>{
    return this.reviewedGameDisplayListSubject.asObservable();
  }


  searchGameByName(){}
  searchMovieByName(){}
  searchTVByName(){}

  deleteReview(){}
  getReview(){}


  private reviews: any[] = []; // Array to store reviews (replace with actual model)

  createReview(reviewData: any): Observable<any> {
    // Assuming you have an API endpoint for posting reviews
    const apiEndpoint = 'https://api.example.com/reviews';

    // For a real application, make an HTTP POST request to the server
    // Example using Angular's HttpClient:
    // return this.httpClient.post(apiEndpoint, reviewData);

    // For simplicity, we'll just store the review locally in this example
    this.reviews.push(reviewData);
    console.info(reviewData);
    // Simulate an asynchronous operation (replace with actual HTTP request)
    return of({ success: true, message: 'Review posted successfully' });
  }
}