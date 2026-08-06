import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginModel } from '../../models/login';
import { AuthModel, LoggedInUser } from '../../models/auth';
import { User } from '../../models/user';
import { ForgotPasswordModel } from '../../models/forgot-password';
import { ResetPasswordModel } from '../../models/reset-password';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:5000/api/auth';
  private readonly tokenKey = 'token';
  private readonly userKey = 'user';

  constructor(private http: HttpClient) {}

  login(payload: LoginModel, rememberMe = true): Observable<AuthModel> {
    return this.http.post<AuthModel>(`${this.apiUrl}/login`, payload).pipe(
      tap((response) => {
        this.setSession(response.token, response.data, rememberMe);
      })
    );
  }

  logout(): Observable<{ success: boolean; message: string }> {
    return this.http
      .post<{ success: boolean; message: string }>(`${this.apiUrl}/logout`, {})
      .pipe(
        tap(() => {
          this.clearSession();
        })
      );
  }

  getMe(): Observable<{ success: boolean; data: User }> {
    return this.http.get<{ success: boolean; data: User }>(`${this.apiUrl}/me`);
  }

  forgotPassword(
    payload: ForgotPasswordModel
  ): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.apiUrl}/forgot-password`,
      payload
    );
  }

  resetPassword(
    token: string,
    payload: ResetPasswordModel,
    rememberMe = true
  ): Observable<AuthModel> {
    return this.http
      .post<AuthModel>(`${this.apiUrl}/reset-password/${token}`, payload)
      .pipe(
        tap((response) => {
          this.setSession(response.token, response.data, rememberMe);
        })
      );
  }

  private setSession(token: string, user: LoggedInUser, rememberMe = true): void {
    const targetStorage = rememberMe ? localStorage : sessionStorage;
    const otherStorage = rememberMe ? sessionStorage : localStorage;

    otherStorage.removeItem(this.tokenKey);
    otherStorage.removeItem(this.userKey);

    targetStorage.setItem(this.tokenKey, token);
    targetStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey) || localStorage.getItem(this.tokenKey);
  }

  getStoredUser(): LoggedInUser | null {
    const rawUser =
      sessionStorage.getItem(this.userKey) || localStorage.getItem(this.userKey);

    return rawUser ? (JSON.parse(rawUser) as LoggedInUser) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  clearSession(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.userKey);
  }
}