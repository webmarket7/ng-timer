import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private router: Router,
        private afAuth: AngularFireAuth
    ) {}

    @Effect()
    authSignUp = this.actions$
        .ofType(AuthActions.TRY_SIGN_UP)
        .pipe(
            map((action: AuthActions.TrySignUp) =>  {
                return action.payload;
            }),
            switchMap((authData: {username: string, password: string}) => {
                return from(this.afAuth.auth.createUserWithEmailAndPassword(authData.username, authData.password));
            }),
            map(() => {
                this.router.navigate(['/']);

                return {type: AuthActions.SIGN_UP};
            })
        );

    @Effect()
    authSignIn = this.actions$
        .ofType(AuthActions.TRY_SIGN_IN)
        .pipe(
            map((action: AuthActions.TrySignIn) =>  {
                return action.payload;
            }),
            switchMap((authData: {username: string, password: string}) => {
                return from(this.afAuth.auth.signInWithEmailAndPassword(authData.username, authData.password));
            }),
            map(() => {
                this.router.navigate(['/']);

                return {type: AuthActions.SIGN_IN};
            })
        );

    @Effect()
    authStateCheck = this.actions$
        .ofType(AuthActions.CHECK_AUTH_STATE)
        .pipe(
            switchMap(() => {
                return this.afAuth.authState;
            }),
            map((authState) => {
                if (authState) {
                    return {type: AuthActions.SIGN_IN};
                } else {
                    return {type: AuthActions.LOG_OUT};
                }
            })
        );


    @Effect()
    authLogout = this.actions$
        .ofType(AuthActions.TRY_LOG_OUT)
        .pipe(
            map(() => {
                this.router.navigate(['auth/sign-in']);
                this.afAuth.auth.signOut();

                return {type: AuthActions.LOG_OUT};
            })
        );
}
