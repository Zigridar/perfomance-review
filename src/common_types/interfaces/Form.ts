import { ReviewType } from "./Review";
import { IQuestion } from "./Question";
import {IUser, IUserWithId} from "./User";

/** Шаблон теста */
export interface IForm {
    description: string;
    type: ReviewType;
    questions: Array<IQuestion>;
    author: IUserWithId;
    archived: Boolean;
}

export interface IFormWithId extends IForm {
    id: string;
}