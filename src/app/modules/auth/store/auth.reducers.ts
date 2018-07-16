import * as AuthActions from './auth.actions';

export interface AuthState {
    authenticated: boolean;
}

const initialState: AuthState = {
    authenticated: null
};

export function authReducer(state: AuthState = initialState, action: AuthActions.AuthActions) {

    switch (action.type) {
        case (AuthActions.SIGN_UP):
        case (AuthActions.SIGN_IN):
            return {
                ...state,
                authenticated: true
            };

        case (AuthActions.LOG_OUT):
            return {
                ...state,
                authenticated: false
            };

        default:
            return state;
    }
}
