import {
  Component,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormsModule,
  NgForm
} from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { AuthService } from '../../../../core/services/auths.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.css']
})
export class ResetPasswordComponent {

  password = '';

  confirmPassword = '';

  loading = false;

  successMessage = '';

  errorMessage = '';

  token = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {

    this.token =
      this.route.snapshot.paramMap.get('token') ?? '';

  }

  submit(form: NgForm): void {

    this.successMessage = '';
    this.errorMessage = '';

    if (form.invalid) {
      form.control.markAllAsTouched();
      this.cdr.detectChanges();
      return;
    }

    if (this.password !== this.confirmPassword) {

      this.errorMessage =
        'Passwords do not match.';

      this.cdr.detectChanges();

      return;
    }

    this.loading = true;
    this.cdr.detectChanges();

    this.authService
      .resetPassword(
        this.token,
        {
          password: this.password
        }
      )
      .subscribe({

        next: () => {

          this.loading = false;

          this.successMessage =
            'Password changed successfully. Redirecting...';

          this.cdr.detectChanges();

          setTimeout(() => {

            this.router.navigate(['/login']);

          }, 2000);

        },

        error: (error) => {

          this.loading = false;

          this.errorMessage =
            error.error?.message ??
            'Failed to reset password.';

          this.cdr.detectChanges();

        }

      });

  }

}