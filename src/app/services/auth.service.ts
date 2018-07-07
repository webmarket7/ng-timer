import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import 'firebase/auth';
import * as firebase from 'firebase';
import * as fromApp from '../store/app.reducers';
import * as AuthActions from '../modules/auth/store/auth.actions';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private router: Router,
        private store: Store<fromApp.AppState>
    ) {}

    signUpUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(response => {
                this.store.dispatch(new AuthActions.SignUp());

                return firebase.auth().currentUser.getIdToken()
                    .then((token: string) => {
                        this.store.dispatch(new AuthActions.SetToken(token));
                    });
            })
            .catch((error) => {
                    console.error(error);
                }
            );
    }

    signInUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((response) => {
                this.store.dispatch(new AuthActions.SignIn());
                this.router.navigate(['/time-tracker']);

                return firebase.auth().currentUser.getIdToken()
                    .then((token: string) => {
                        this.store.dispatch(new AuthActions.SetToken(token));
                    });
            })
            .catch((error) => {
                    console.error(error);
                }
            );
    }

    logout() {
        firebase.auth().signOut();
        this.store.dispatch(new AuthActions.LogOut());

        this.router.navigate(['/sign-in']);
    }
}
