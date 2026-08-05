import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { API_BASE_URL } from '../api-url';
import { ApiResponse } from './api-response';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);
  private readonly tokenKey = 'inventory_auth_token';

  login(email: string, password: string) {
    return this.http.post<ApiResponse<AuthUser>>(`${this.apiBaseUrl}/auth/login`, { email, password }).pipe(
      tap((response) => {
        if (response.token) localStorage.setItem(this.tokenKey, response.token);
      }),
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
