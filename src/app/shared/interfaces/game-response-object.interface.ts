import { IGameCover } from "./game-cover.interface"
import { IPlatform } from "./platform.interface"


export interface IGameResponseObject{
    id:number,
    first_release_date:number,
    cover:IGameCover
    name:string,
    platforms:IPlatform[],
    summary:string
  }