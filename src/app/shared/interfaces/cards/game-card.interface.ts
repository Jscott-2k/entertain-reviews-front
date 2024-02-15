import { IEntertainmentCard } from "../entertainment-strategy.interface";

export interface IGameCard extends IEntertainmentCard{
    summary:string,
    platforms:string[],
    firstReleaseDate:number,
    coverImageURL:string
  }
  