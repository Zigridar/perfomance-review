import { ReviewType } from "./Review";
import { IQuestion } from "./Question";
import { IUserWithId } from "./User";

/** Шаблон теста */
export interface IForm {
    description: string;
    type: ReviewType;
    questions: Array<IQuestion>;
    author: IUserWithId;
}