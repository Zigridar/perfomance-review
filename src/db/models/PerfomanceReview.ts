import { Document, model, Model, Schema } from 'mongoose';
import { IPerfomanceReview, IPerfomanceReviewWithId } from '../../common_types/interfaces/PerfomanceReview';

export type DocumentPerfomanceReview = Document & IPerfomanceReview;

const PerfomanceReviewSchema: Schema<DocumentPerfomanceReview> = new Schema<DocumentPerfomanceReview>({
    name: { type: String, required: true },
    author: Object,
    employee: Object,
    events: [Object],
    dateOfOneToOne: { type: Date, required: true },
    result: { type: String }
});

const PerfomanceReview: Model<DocumentPerfomanceReview> = model<DocumentPerfomanceReview>('perfomance-review', PerfomanceReviewSchema);

export default PerfomanceReview;

export const toIPerfomanceReviewWithId: (pr: DocumentPerfomanceReview) => IPerfomanceReviewWithId = (pr: DocumentPerfomanceReview) => {
    return {
        id: pr._id,
        name: pr.name,
        author: pr.author,
        employee: pr.employee,
        events: pr.events,
        dateOfOneToOne: pr.dateOfOneToOne,
        result: pr.result
    }
}
