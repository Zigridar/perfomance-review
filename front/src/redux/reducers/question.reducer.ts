import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IQuestion } from '../../../../src/common_types/interfaces/Question';

export interface QuestionState {
  questions: IQuestion[];
}

const initialState: QuestionState = {
  questions: [],
};

const slice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    loadQuestions(state: QuestionState, action: PayloadAction<IQuestion[]>) {
      state.questions = action.payload;
      return state;
    },
    createQuestion(state: QuestionState, action: PayloadAction<IQuestion>) {
      state.questions.push(action.payload);
      return state;
    },
  },
});

const { reducer, actions } = slice;

export const { createQuestion, loadQuestions } = actions;

export default reducer;
