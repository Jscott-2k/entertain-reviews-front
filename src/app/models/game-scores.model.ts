import { GameCoverModel } from "./game-cover.model"
import { IPlatform } from "../shared/interfaces/platform.interface"


export interface GameScoresModel{
    game:number,
    technical:number,
    story:number,
    uiux:number,
    sfx:number,
    graphics:number,
    gameplay:number,
    music:number,
    playtime:number,
    overall_weighted:number,
    overall_wnweighted:number,
}