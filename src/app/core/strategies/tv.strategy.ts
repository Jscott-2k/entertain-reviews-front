import IEntertainmentStrategy, { IEntertainmentCard, IEntertainmentResponseModel, IFetchRequestParams } from 'src/app/shared/interfaces/entertainment-strategy.interface';
import { ReviewService } from '../review.service';
import { Observable } from 'rxjs';

// TODO: Define TVFetchRequestParams
export interface ITVFetchRequestParams extends IFetchRequestParams {

}

// TODO: Define TVModel
interface TVModel extends IEntertainmentResponseModel {
  
}

export class TVStrategy implements IEntertainmentStrategy<TVModel, ITVFetchRequestParams> {
  constructor(private reviewService: ReviewService) {}
  setDefaultParams(data: ITVFetchRequestParams): void {
    throw new Error('Method not implemented.');
  }
  fetchReviewed(data:ITVFetchRequestParams): Observable<TVModel[]> {
    throw new Error('Method not implemented.');
  }
  fetchCards(response:TVModel[]): Observable<IEntertainmentCard[]> {
    throw new Error('Method not implemented.');
  }
}