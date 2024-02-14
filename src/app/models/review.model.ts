export interface ReviewModel {
    game:number,
    id:number,
    author:string,
    date:string,
    playtime:number,
    platform:string,
    written:string,
    overall_weighted:number,
    overall_unweighted:number,
    general_weighted:number,
    general_unweighted:number,
    technical_score:number,
    technical_written:string,
    pros_total_modifier:number,
    cons_total_modifier:number
}