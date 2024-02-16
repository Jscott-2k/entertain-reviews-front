import IEntertainmentStrategy, {
  IFetchRequestParams as IFetchRequestParams,
} from 'src/app/shared/interfaces/entertainment-strategy.interface';
import { ReviewService } from '../review.service';
import { Observable } from 'rxjs';
import { GameModel } from 'src/app/models/game.model';
import { IGameCard } from 'src/app/shared/interfaces/cards/game-card.interface';
import { IgdbImageService } from '../igdb-image.service';
import { IgdbImageSize } from 'src/app/shared/enums/igdb-image-size.enum';
import { PlatformService } from '../platform.service';
import { ReviewedGameModel } from 'src/app/models/reviewed-game.model';
import { GameCoverModel } from 'src/app/models/game-cover.model';

export interface IGameFetchRequestParams extends IFetchRequestParams {
  platforms: string[];
}

export class GameStrategy
  implements IEntertainmentStrategy<ReviewedGameModel, IGameFetchRequestParams>
{
  constructor(
    private reviewService: ReviewService,
    private platformService: PlatformService,
    private igdbImageService: IgdbImageService
  ) {}

  private _params: IGameFetchRequestParams = {
    platforms: [],
  };
  setDefaultParams(data: IGameFetchRequestParams): void {
    this._params = data;
  }

  fetchReviewed(
    params?: IGameFetchRequestParams
  ): Observable<ReviewedGameModel[]> {
    let p = params ?? this._params;
    return this.reviewService.fetchReviewedGames(p.platforms);
  }

  fetchCards(response: ReviewedGameModel[]): Observable<IGameCard[]> {
    return this.mapGameModelToGameCard(response);
  }
  private mapGameModelToGameCard(
    response: ReviewedGameModel[]
  ): Observable<IGameCard[]> {
    return new Observable((observer) => {
      const gameCards: IGameCard[] = response.map(
        (game: ReviewedGameModel) => ({
          title: game.name,
          id: game.id,
          summary: game.summary,
          platforms: this.extractPlatformAbbreviations(game.platforms),
          firstReleaseDate: game.first_release_date,
          coverImageURL: this.extractCoverImageURL(game.cover) , // Provide a default value in case cover or image_id is missing,
        })
      );
      observer.next(gameCards);
      observer.complete();
    });
  }

  private extractPlatformAbbreviations(platforms: { id: number; abbreviation: string }[] | undefined): string[] {
    if (!Array.isArray(platforms)) {
      return [];
    }
    return platforms.map((p) => p?.abbreviation || '');
  }

  private extractCoverImageURL(cover: GameCoverModel | undefined): string {
    if (!cover || !cover.image_id) {
      return '';
    }
    return this.igdbImageService.getImageUrl(
      cover.image_id,
      IgdbImageSize.Thumb
    );
  }
}
