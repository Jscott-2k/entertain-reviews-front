import IEntertainmentStrategy, { IEntertainmentCard, IEntertainmentResponseModel, IFetchRequestParams } from 'src/app/shared/interfaces/entertainment-strategy.interface';
import { ReviewService } from '../review.service';
import { Observable } from 'rxjs';

// TODO: Define MovieFetchRequestParams
export interface IMovieFetchRequestParams extends IFetchRequestParams {

}

// TODO: Define MovieModel
interface MovieModel extends IEntertainmentResponseModel {
  
}
export class MovieStrategy implements IEntertainmentStrategy<MovieModel, IMovieFetchRequestParams> {
  constructor(private reviewService: ReviewService) {}

  setDefaultParams(data: IMovieFetchRequestParams): void {
    throw new Error('Method not implemented.');
  }
  getCards(response: MovieModel[]): IEntertainmentCard[] {
    throw new Error('Method not implemented.');
  }
  fetchReviewed(data: IMovieFetchRequestParams): Observable<MovieModel[]> {
    throw new Error('Method not implemented.');
  }

}