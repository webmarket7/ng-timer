import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.pug',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'app';

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        firebase.initializeApp({
            apiKey: 'AIzaSyC-LOoyLVfWkT8mEKNrPbLl6HC4RHiryA8',
            authDomain: 'ng-timer.firebaseapp.com',
            databaseURL: 'https://ng-timer.firebaseio.com',
            projectId: 'ng-timer',
            storageBucket: 'ng-timer.appspot.com',
            messagingSenderId: '55249725552'
        });
    }

    onLogOut() {
        this.authService.logout();
    }
}
