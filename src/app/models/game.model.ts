import { GameCoverModel } from "./game-cover.model"
import { PlatformModel } from "./platform.model"


export interface GameModel{
    id:number,
    first_release_date:number,
    cover:GameCoverModel
    name:string,
    platforms:PlatformModel[],
    summary:string,
    companies:string
  }