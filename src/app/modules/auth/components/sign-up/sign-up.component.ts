import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.pug',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
    }

    onSignUp(form: NgForm) {
        const formData = form.value,
              email = formData.email,
              password = formData.password;

        this.authService.signUpUser(email, password);
    }

}
