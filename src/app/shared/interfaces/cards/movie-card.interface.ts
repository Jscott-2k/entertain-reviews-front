import { IEntertainmentCard } from "../entertainment-strategy.interface";

export interface IMovieCard extends IEntertainmentCard{
    summary:string,
    firstReleaseDate:number,
    coverImageURL:string
  }
  