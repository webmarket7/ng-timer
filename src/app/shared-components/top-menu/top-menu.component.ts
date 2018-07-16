import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../modules/auth/store/auth.reducers';
import * as AuthActions from '../../modules/auth/store/auth.actions';

@Component({
    selector: 'app-top-menu',
    templateUrl: './top-menu.component.pug',
    styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {

    authState$: Observable<fromAuth.AuthState>;

    constructor(
        private store: Store<fromApp.AppState>
    ) {}

    ngOnInit() {
        this.authState$ = this.store.select('auth');
    }

    onLogOut() {
        this.store.dispatch(new AuthActions.TryLogOut());
    }
}
