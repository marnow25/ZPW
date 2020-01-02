import { Component} from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent{
  credentials = {
    email: '',
    password: ''
  };

  registerInfo = '';


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  signIn() {
    this.authenticationService.login(this.credentials)
      .then(() => this.router.navigate(['/']))
      .catch(err => alert(err.message) );
  }

}
