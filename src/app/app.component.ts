import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';
import * as fromApp from './store/app.reducers';
import * as AuthActions from './modules/auth/store/auth.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.pug',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    isAppLoaded: boolean;

    constructor(
        private afAuth: AngularFireAuth,
        private store: Store<fromApp.AppState>
    ) {
        this.isAppLoaded = false;
    }

    ngOnInit() {
        this.afAuth.authState
            .subscribe(
                (authData) => {
                    if (!this.isAppLoaded) {
                        this.isAppLoaded = true;
                    }

                    if (authData) {
                        this.store.dispatch(new AuthActions.SignIn());
                    } else {
                        this.store.dispatch(new AuthActions.TryLogOut());
                    }
                }
            );
    }
}
