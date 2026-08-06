import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  NgForm
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../../core/services/auths.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css']
})
export class ForgotPasswordComponent {

  email = '';

  loading = false;

  successMessage = '';

  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  submit(form: NgForm): void {

    this.successMessage = '';
    this.errorMessage = '';

    if (form.invalid) {
      return;
    }

    this.loading = true;

    this.authService
      .forgotPassword({
        email: this.email.trim()
      })
      .subscribe({

        next: (response) => {

          this.loading = false;

          this.successMessage =
            response.message ??
            'Password reset link sent successfully.';
        },

        error: (error) => {

          this.loading = false;

          this.errorMessage =
            error.error?.message ??
            'Failed to send reset link.';
        }

      });

  }

  back(): void {
    this.router.navigate(['/login']);
  }

}