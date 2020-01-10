import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  credentials = {
    email: '',
    password: '',
    passwordConfirmation: ''
  };

  registerInfo = '';

  constructor( private router: Router, private authenticationService: AuthenticationService) { }

  signUp() {
    if (this.credentials.password !== this.credentials.passwordConfirmation) {
      alert('Passwords are not equal');
      return;
    }
    this.authenticationService.register(this.credentials)
      .then(() => this.router.navigateByUrl('/log-in'))
      .catch(err => alert(err.message));
  }
}
