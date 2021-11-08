import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './reducers/admin.reducer';
import formReducer from './reducers/form.reducer';
import questionReducer from './reducers/question.reducer';

const store = configureStore({
  reducer: {
    admin: adminReducer,
    form: formReducer,
    question: questionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
