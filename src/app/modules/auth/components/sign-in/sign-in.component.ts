import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.pug',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
    }

    onSignIn(form: NgForm) {
        const formData = form.value,
            email = formData.email,
            password = formData.password;

        this.authService.signInUser(email, password);
    }
}
