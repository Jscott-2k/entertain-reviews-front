import { GameCoverModel } from "./game-cover.model"


export interface GameModel{
    id:number,
    first_release_date:number,
    cover:GameCoverModel
    name:string,
    platforms:number[]
    summary:string,
    involved_companies:string
  }