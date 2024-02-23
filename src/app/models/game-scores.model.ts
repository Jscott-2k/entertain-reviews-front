import { GameCoverModel } from "./game-cover.model"
import { PlatformModel } from "./platform.model"


export interface GameScoresModel{
    game:number,
    technical:number,
    pros:number,
    cons:number,
    story:number,
    uiux:number,
    sfx:number,
    graphics:number,
    gameplay:number,
    music:number,
    playtime:number,
    overall_weighted:number,
    overall_unweighted:number,
}