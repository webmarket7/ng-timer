import { Action } from '@ngrx/store';

export const TRY_SIGN_UP = 'TRY_SIGN_UP';
export const SIGN_UP = 'SIGN_UP';
export const TRY_SIGN_IN = 'TRY_SIGN_IN';
export const SIGN_IN = 'SIGN_IN';
export const TRY_LOG_OUT = 'TRY_LOG_OUT';
export const LOG_OUT = 'LOG_OUT';
export const CHECK_AUTH_STATE = 'CHECK_AUTH_STATE';

export class TrySignUp implements Action {
    readonly type = TRY_SIGN_UP;

    constructor(public payload: {
        username: string,
        password: string
    }) {}
}

export class SignUp implements Action {
    readonly type = SIGN_UP;
}

export class TrySignIn implements Action {
    readonly type = TRY_SIGN_IN;

    constructor(public payload: {
        username: string,
        password: string
    }) {}
}

export class SignIn implements Action {
    readonly type = SIGN_IN;
}

export class TryLogOut implements Action {
    readonly type = TRY_LOG_OUT;
}

export class LogOut implements Action {
    readonly type = LOG_OUT;
}

export class CheckAuthState implements Action {
    readonly type = CHECK_AUTH_STATE;
}

export type AuthActions = TrySignUp | SignUp | TrySignIn | SignIn | LogOut | CheckAuthState;
