export const SET_LOGGED_USER = 'SET_LOGGED_USER';
export const CLEAR_LOGGED_USER = 'CLEAR_LOGGED_USER';

export interface LoggedUser {
    name: string;
    email: string;
    photo: string;
    uid: string;
}

export interface LoggedUserState {
    user: LoggedUser;
    loggedIn: boolean;
}

interface SetLoggedUserAction {
    type: typeof SET_LOGGED_USER;
    payload: LoggedUser;
}

interface ClearLoggedUserAction {
    type: typeof CLEAR_LOGGED_USER;
}

export type LoggedUserActionTypes = SetLoggedUserAction | ClearLoggedUserAction;
