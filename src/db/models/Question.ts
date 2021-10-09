import { Document, model, Model, Schema } from 'mongoose';
import { IQuestion, IQuestionWithId } from "../../common_types/interfaces/Question";

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