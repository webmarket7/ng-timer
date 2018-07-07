import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import 'firebase/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    token: string;

    constructor(private router: Router) {
    }

    signUpUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch((error) => {
                    console.error(error);
                }
            );
    }

    signInUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((response) => {
                this.router.navigate(['/time-tracker']);

                return firebase.auth().currentUser.getIdToken()
                    .then((token: string) => {
                        this.token = token;
                    });
            })
            .catch((error) => {
                    console.error(error);
                }
            );
    }

    getCurrentToken() {
        const user = firebase.auth().currentUser;

        if (user) {
            firebase.auth().currentUser.getIdToken()
                .then((token: string) => {
                    this.token = token;
                });
        } else {
            console.error('You are not signed in!');
        }

        return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }

    logout() {
        firebase.auth().signOut();
        this.token = null;

        this.router.navigate(['/sign-in']);
    }
}
