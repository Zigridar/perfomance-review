import { ReviewType, AROUND, ATTESTATION, SELF_ATTESTATION } from '../../../src/common_types/interfaces/Review';

export interface IReviewTag {
  color: string;
  title: string;
  type: ReviewType;
}

export const getReviewTag: (type: ReviewType) => IReviewTag = (type: ReviewType) => {
  switch (type) {
    case ATTESTATION:
      return {
        color: '#007EE3',
        title: 'Аттестация',
        type: ATTESTATION,
      };
      break;
    case SELF_ATTESTATION:
      return {
        color: '#E55741',
        title: 'Самооценка',
        type: SELF_ATTESTATION,
      };
      break;
    case AROUND:
      return {
        color: '#23B7A2',
        title: 'Оценка 360',
        type: AROUND,
      };
      break;
    default:
      break;
  }
};
