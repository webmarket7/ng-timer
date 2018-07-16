import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducers';
import * as AuthActions from '../../store/auth.actions';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.pug',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

    constructor(
        private store: Store<fromApp.AppState>
    ) {}

    onSignUp(form: NgForm) {
        const formData = form.value,
              email = formData.email,
              password = formData.password;

        this.store.dispatch(new AuthActions.TrySignUp({
            username: email,
            password
        }));
    }
}
