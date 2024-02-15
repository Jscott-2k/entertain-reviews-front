import { IEntertainmentCard } from '../entertainment-strategy.interface';

export interface ITVCard extends IEntertainmentCard {
  summary: string;
  firstReleaseDate: number;
  coverImageURL: string;
}
