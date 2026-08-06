import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';

import { Sidebar } from '../../../../shared/components/sidebar/sidebar';
import { UserService } from '../../../../core/services/user.service';

import {
  CreateUserPayload,
  UpdateUserPayload,
  UserRole
} from '../../../../models/user';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Sidebar
  ],
  templateUrl: './user-form.html',
  styleUrls: ['./user-form.css']
})
export class UserForm implements OnInit {

  form: FormGroup;

  userId: string | null;
  isEditMode: boolean;

  loading = false;
  submitting = false;

  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.isEditMode = Boolean(this.userId);

    this.form = this.formBuilder.nonNullable.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: [
        '',
        [
          Validators.minLength(6)
        ]
      ],
      role: [
        'staff' as UserRole,
        [
          Validators.required
        ]
      ],
      isActive: [
        true
      ]
    });

    if (!this.isEditMode) {
      this.form.get('password')?.addValidators(Validators.required);
      this.form.get('password')?.updateValueAndValidity();
    }
  }

  ngOnInit(): void {
    if (this.isEditMode && this.userId) {
      this.loadUser(this.userId);
    }
  }

  loadUser(id: string): void {
    this.loading = true;
    this.errorMessage = '';

    this.userService.getUserById(id)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (user) => {
          this.form.patchValue({
            name: user.name,
            email: user.email,
            password: '',
            role: user.role,
            isActive: user.isActive
          });

          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error loading user:', error);

          this.errorMessage =
            error.error?.message ??
            'Failed to load user data';

          this.cdr.detectChanges();
        }
      });
  }

  submit(): void {
    this.errorMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();

    if (this.isEditMode && this.userId) {
      this.updateUser(this.userId, formValue);
      return;
    }

    this.createUser(formValue);
  }

  private createUser(formValue: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    isActive: boolean;
  }): void {
    const password = formValue.password.trim();

    if (!password) {
      this.errorMessage = 'Password is required';
      this.cdr.detectChanges();
      return;
    }

    const payload: CreateUserPayload = {
      name: formValue.name.trim(),
      email: formValue.email.trim(),
      password,
      role: formValue.role,
      isActive: formValue.isActive
    };

    this.submitting = true;
    this.cdr.detectChanges();

    this.userService.createUser(payload)
      .pipe(
        finalize(() => {
          this.submitting = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/users']);
        },
        error: (error) => {
          console.error('Error creating user:', error);

          this.errorMessage =
            error.error?.message ??
            'Failed to create user';

          this.cdr.detectChanges();
        }
      });
  }

  private updateUser(
    id: string,
    formValue: {
      name: string;
      email: string;
      password: string;
      role: UserRole;
      isActive: boolean;
    }
  ): void {
    const password = formValue.password.trim();

    const payload: UpdateUserPayload = {
      name: formValue.name.trim(),
      email: formValue.email.trim(),
      role: formValue.role,
      isActive: formValue.isActive,
      ...(password ? { password } : {})
    };

    this.submitting = true;
    this.cdr.detectChanges();

    this.userService.updateUser(id, payload)
      .pipe(
        finalize(() => {
          this.submitting = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/users']);
        },
        error: (error) => {
          console.error('Error updating user:', error);

          this.errorMessage =
            error.error?.message ??
            'Failed to update user';

          this.cdr.detectChanges();
        }
      });
  }

  cancel(): void {
    this.router.navigate(['/users']);
  }
}