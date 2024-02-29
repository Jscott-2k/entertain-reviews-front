import { ReviewProConModel } from "src/app/models/review-pro-con.model";
import { ReviewScoreModel } from "src/app/models/review-score.model";
import { ReviewModel } from "src/app/models/review.model";

export interface CreateReviewDTO{
    reviewData:ReviewModel,
    scoresData:ReviewScoreModel[],
    prosData:ReviewProConModel[],
    consData:ReviewProConModel[]
}