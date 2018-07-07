import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './services/auth.service';
import { firebaseConfig } from './firebase-config';

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
        firebase.initializeApp(firebaseConfig);
    }

    onLogOut() {
        this.authService.logout();
    }
}
