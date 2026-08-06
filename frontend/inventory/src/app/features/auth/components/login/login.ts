import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../../core/services/auths.service';
import { LoginModel } from '../../../../models/login';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
  
export class LoginComponent {

  loginData: LoginModel = {
    email: '',
    password: '',
  };

  rememberMe = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  login(): void {

    this.errorMessage = '';
    this.isLoading = true;

    this.authService.login(this.loginData, this.rememberMe).subscribe({

      next: (res) => {

        this.isLoading = false;

        console.log(res);

        this.router.navigate(['/products']);

      },

      error: (err) => {

        this.isLoading = false;

        this.errorMessage =
          err?.error?.message ||
          'Login failed';

      }

    });

  }

}