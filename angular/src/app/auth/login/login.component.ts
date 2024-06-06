import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { iAuthData } from '../interfaces/i-auth-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authData: iAuthData = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.authData).subscribe((data) => {
      console.log(data);
    });
  }
}
