import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducers';
import * as fromAuth from './modules/auth/store/auth.reducers';
import * as firebase from 'firebase';
import { firebaseConfig } from './api/firebase-config';
import { AuthService } from './services/auth.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.pug',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    authState: Observable<fromAuth.State>;

    constructor(
        private store: Store<fromApp.AppState>,
        private authService: AuthService
    ) {}

    ngOnInit() {
        firebase.initializeApp(firebaseConfig);
        this.authState = this.store.select('auth');
    }

    onLogOut() {
        this.authService.logout();
    }
}
