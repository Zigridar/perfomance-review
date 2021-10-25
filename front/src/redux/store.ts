import { combineReducers, createStore } from 'redux';
import adminReducer from './reducers/admin.reducer';
import questionReducer from './reducers/question.reducer';
import formReducer from './reducers/form.reducer';

const rootReducer = combineReducers({
  admin: adminReducer,
  questions: questionReducer,
  forms: formReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;
