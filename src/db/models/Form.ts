import {Document, model, Model, Schema} from 'mongoose';
import {IForm} from "../../common_types/ModelTypes";

export type DocumentForm = Document & IForm;

const FormSchema: Schema<DocumentForm> = new Schema<DocumentForm>({
    description: { type: String, required: true },
    type: { type: String, required: true },
    questions: [Object],
    author: Object
});

const Form: Model<DocumentForm> = model<DocumentForm>('form', FormSchema);

export default Form;
