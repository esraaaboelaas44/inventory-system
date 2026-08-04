import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = '';
  password = '';
  rememberMe = false;

  login(): void {
    console.log({
      username: this.username,
      password: this.password,
      rememberMe: this.rememberMe,
    });
  }
}