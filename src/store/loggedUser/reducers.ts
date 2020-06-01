import { LoggedUserState, LoggedUserActionTypes, SET_LOGGED_USER, CLEAR_LOGGED_USER } from "./types";

const intialLoggedUserState: LoggedUserState = {
    user: {
        name: '',
        email: '',
        photo: '',
        uid: '',
    },
    loggedIn: false,
};

export function loggedUserReducer(
    state = intialLoggedUserState,
    action: LoggedUserActionTypes
): LoggedUserState {
    switch(action.type) {
        case SET_LOGGED_USER:
            const loggedUser = action.payload;
            return {
                ...state,
                user: loggedUser,
                loggedIn: true,
            };
        case CLEAR_LOGGED_USER:
            return {
                ...state,
                user: intialLoggedUserState.user,
                loggedIn: false,
            };
        default:
            return state;
    }
}