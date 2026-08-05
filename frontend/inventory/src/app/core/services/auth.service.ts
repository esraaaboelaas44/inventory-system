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
  private readonly userKey = 'inventory_auth_user';

  login(email: string, password: string) {
    return this.http
      .post<ApiResponse<AuthUser>>(`${this.apiBaseUrl}/auth/login`, { email, password })
      .pipe(
        tap((response) => {
          if (response.token) localStorage.setItem(this.tokenKey, response.token);
          if (response.data) localStorage.setItem(this.userKey, JSON.stringify(response.data));
        }),
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  getCurrentUser(): AuthUser | null {
    const storedUser = localStorage.getItem(this.userKey);
    if (!storedUser) return null;

    try {
      return JSON.parse(storedUser) as AuthUser;
    } catch {
      localStorage.removeItem(this.userKey);
      return null;
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
