import { GameCoverModel } from "./game-cover.model"
import { PlatformModel } from "./platform.model"


export interface GameModel{
    id:number,
    first_release_date:number,
    cover:number
    name:string,
    platforms:number[]
    summary:string,
    involved_companies:string
  }