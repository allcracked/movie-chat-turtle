import { LoggedUser, SET_LOGGED_USER, CLEAR_LOGGED_USER, LoggedUserActionTypes } from './types';

export function setLoggedUser(loggedUser: LoggedUser): LoggedUserActionTypes {
    return {
        type: SET_LOGGED_USER,
        payload: loggedUser,
    }
}

export function clearLoggedUser(): LoggedUserActionTypes {
    return {
        type: CLEAR_LOGGED_USER,
    }
}