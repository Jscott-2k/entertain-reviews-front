import { GameCoverModel } from "./game-cover.model"
import { IPlatform } from "../shared/interfaces/platform.interface"


export interface GameModel{
    id:number,
    first_release_date:number,
    cover:GameCoverModel
    name:string,
    platforms:IPlatform[],
    summary:string,
    companies:string
  }