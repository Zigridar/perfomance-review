import {IQuestion} from "../../../../src/common_types/interfaces/Question";

export const CREATE_QUESTION = 'CREATE_QUESTION';
export const LOAD_QUESTIONS = 'LOAD_QUESTIONS';

export interface QuestionState {
  questions: IQuestion[];
}

export interface CreateQuestionAction {
  type: typeof CREATE_QUESTION;
  question: IQuestion;
}

export interface LoadQuestionsAction {
  type: typeof LOAD_QUESTIONS;
  questions: IQuestion[];
}

const initialState: QuestionState = {
  questions: []
}

export type QuestionAction = CreateQuestionAction | LoadQuestionsAction;

const questionReducer: (state: QuestionState, action: QuestionAction) => QuestionState = (state: QuestionState = initialState, action: QuestionAction) => {
  switch (action.type) {
    case LOAD_QUESTIONS:
      return {
        ...state,
        questions: [...action.questions]
      }
    case CREATE_QUESTION:
      debugger
      return {
        ...state,
        questions: [...state.questions, action.question]
      }
    default:
      return state
  }
}

export default questionReducer
