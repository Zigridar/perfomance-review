import {Document, model, Model, Schema} from 'mongoose';
import {IAnswer, IQuestion, IQuestionWithId, QuestionType} from "../../common_types/ModelTypes";

export type DocumentQuestion = Document & IQuestion;

const QuestionSchema: Schema<DocumentQuestion> = new Schema<DocumentQuestion>({
    text: { type: String, required: true },
    type: { type: String, required: true },
    answers: [Object],
    variable: { type: String },
    scored: { type: Boolean }
});

const Question: Model<DocumentQuestion> = model<DocumentQuestion>('question', QuestionSchema);

export default Question;

export const toIQuestionWithId: (question: DocumentQuestion) => IQuestionWithId = (question: DocumentQuestion) => {
    return {
        id: question._id,
        type: question.type,
        text: question.text,
        answers: question.answers,
        variable: question.variable,
        scored: question.scored
    }
}