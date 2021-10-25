import { Document, model, Model, Schema } from 'mongoose';
import { IForm, IFormWithId } from '../../common_types/interfaces/Form';

export type DocumentForm = Document & IForm;

const FormSchema: Schema<DocumentForm> = new Schema<DocumentForm>({
  description: { type: String, required: true },
  type: { type: String, required: true },
  questions: [Object],
  author: Object,
  archived: { type: Boolean, required: true, default: false },
});

const Form: Model<DocumentForm> = model<DocumentForm>('form', FormSchema);

export default Form;

/** Convert to IUserWithId model */
export const toIFormWithId: (form: DocumentForm) => IFormWithId = (form: DocumentForm) => {
  return {
    id: form._id,
    description: form.description,
    type: form.type,
    questions: form.questions,
    author: form.author,
    archived: form.archived,
  };
};