import {Document, model, Model, Schema} from 'mongoose';
import {IQuestion} from "../../common_types/ModelTypes";

export type DocumentQuestion = Document & IQuestion;

const QuestionSchema: Schema<DocumentQuestion> = new Schema<DocumentQuestion>({
    text: { type: String, required: true },
    type: { type: String, required: true },
    answers: [Object]

});

const Question: Model<DocumentQuestion> = model<DocumentQuestion>('question', QuestionSchema);

export default Question;
