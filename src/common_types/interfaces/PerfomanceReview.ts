import { IEvent } from "./Review";
import { IUser } from "./User";

export interface IPerfomanceReview {
    name: string,
    author: IUser,
    employee: IUser,
    events: Array<IEvent>,
    dateOfOneToOne: Date,
    result?: string
}

export interface IPerfomanceReviewWithId extends IPerfomanceReview {
    id: string
}