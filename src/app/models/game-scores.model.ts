import { GameCoverModel } from "./game-cover.model"
import { IPlatform } from "../shared/interfaces/platform.interface"


export interface GameScoreModel{
    gameID:number,
    technical:number,
    story:number,
    uiux:number,
    sfx:number,
    graphics:number,
    gameplay:number,
    music:number,
    playTime:number,
    overallWeighted:number,
    overallUnweighted:number,
}