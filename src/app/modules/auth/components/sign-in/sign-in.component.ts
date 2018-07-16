import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducers';
import * as AuthActions from '../../store/auth.actions';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.pug',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

    constructor(
        private store: Store<fromApp.AppState>
    ) {}

    onSignIn(form: NgForm) {
        const formData = form.value,
            email = formData.email,
            password = formData.password;

        this.store.dispatch(new AuthActions.TrySignIn({
            username: email,
            password
        }));
    }
}
