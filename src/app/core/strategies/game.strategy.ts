import IEntertainmentStrategy, {
  IFetchRequestParams as IFetchRequestParams,
} from 'src/app/shared/interfaces/entertainment-strategy.interface';
import { ReviewService } from '../review.service';
import { Observable } from 'rxjs';
import { GameModel } from 'src/app/models/game.model';
import { IGameCard } from 'src/app/shared/interfaces/cards/game-card.interface';
import { IgdbImageService } from '../igdb-image.service';
import { IgdbImageSize } from 'src/app/shared/enums/igdb-image-size.enum';

export interface IGameFetchRequestParams extends IFetchRequestParams {
  platforms: string[];
}

export class GameStrategy
  implements IEntertainmentStrategy<GameModel, IGameFetchRequestParams>
{
  constructor(
    private reviewService: ReviewService,
    private igdbImageService: IgdbImageService
  ) {}

  private _params: IGameFetchRequestParams = {
    platforms: [],
  };
  setDefaultParams(data: IGameFetchRequestParams): void {
    this._params = data;
  }

  fetchReviewed(params?: IGameFetchRequestParams): Observable<GameModel[]> {
    let p = params ?? this._params;
    return this.reviewService.fetchReviewedGames(p.platforms);
  }

  getCards(response: GameModel[]): IGameCard[] {
    return this.mapGameModelToGameCard(response);
  }
  private mapGameModelToGameCard(response: GameModel[]): IGameCard[] {
    return response.map((game: GameModel) => ({
      title: game.name,
      id: game.id,
      summary: game.summary,
      platforms:
        game.platforms?.flatMap(({ abbreviation }) => abbreviation ?? '') ?? [],
      firstReleaseDate: game.first_release_date,
      coverImageURL: this.igdbImageService.getImageUrl(
        game.cover?.image_id,
        IgdbImageSize.CoverBig
      ),
    }));
  }
}
