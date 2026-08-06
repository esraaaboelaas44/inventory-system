import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

import { AuthService } from '../../../../core/services/auths.service';
import { LoginModel } from '../../../../models/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
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

  login(loginForm: NgForm): void {

    this.errorMessage = '';

    if (loginForm.invalid) {
      loginForm.control.markAllAsTouched();
      this.cdr.detectChanges();
      return;
    }

    this.isLoading = true;

    this.authService
      .login(this.loginData, this.rememberMe)
      .subscribe({

        next: () => {

          this.isLoading = false;

          this.router.navigate(['/products']);

        },

        error: (err) => {

          this.isLoading = false;

          if (err.status === 401) {

            this.errorMessage =
              'Invalid email or password.';

          } else if (err.status === 400) {

            this.errorMessage =
              err.error?.message ??
              'Please check your data.';

          } else if (err.status === 500) {

            this.errorMessage =
              'Server error.';

          } else {

            this.errorMessage =
              'Login failed.';

          }

          this.cdr.detectChanges();

        }

      });

  }

}