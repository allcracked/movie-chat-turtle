import { combineReducers } from 'redux';
import { loggedUserReducer } from './loggedUser/reducers';

export const rootReducer = combineReducers({
    loggedUser: loggedUserReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
