import { Observable } from "rxjs";

export interface IEntertainmentResponseModel {}
export interface IFetchRequestParams {}
export interface IEntertainmentCard {
    title:string,
    id:number
}

export default interface IEntertainmentStrategy<
T extends IEntertainmentResponseModel,
P extends IFetchRequestParams
> {
    fetchReviewed(data?: P): Observable<T[]>;
    getCards(response:T[]):IEntertainmentCard[];
    setDefaultParams(data:P):void;
}