import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  Observable,
  map
} from 'rxjs';

import {
  User,
  CreateUserPayload,
  UpdateUserPayload
} from '../../models/user';

interface UsersResponse {
  users?: User[];
  data?: User[];
}

interface UserResponse {
  user?: User;
  data?: User;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl =
    'http://localhost:5000/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[] | UsersResponse>(this.apiUrl)
      .pipe(
        map((response) => {
          if (Array.isArray(response)) {
            return response;
          }

          return response.users ?? response.data ?? [];
        })
      );
  }

  getUserById(id: string): Observable<User> {
    return this.http
      .get<User | UserResponse>(
        `${this.apiUrl}/${id}`
      )
      .pipe(
        map((response) => {
          if ('_id' in response) {
            return response;
          }

          const user = response.user ?? response.data;

          if (!user) {
            throw new Error(
              'The backend response does not contain a user'
            );
          }

          return user;
        })
      );
  }

  createUser(
    payload: CreateUserPayload
  ): Observable<User> {

    return this.http
      .post<User | UserResponse>(
        this.apiUrl,
        payload
      )
      .pipe(
        map((response) => {
          if ('_id' in response) {
            return response;
          }

          const user = response.user ?? response.data;

          if (!user) {
            throw new Error(
              'The backend response does not contain the created user'
            );
          }

          return user;
        })
      );
  }

  updateUser(
    id: string,
    payload: UpdateUserPayload
  ): Observable<User> {

    return this.http
      .put<User | UserResponse>(
        `${this.apiUrl}/${id}`,
        payload
      )
      .pipe(
        map((response) => {
          if ('_id' in response) {
            return response;
          }

          const user = response.user ?? response.data;

          if (!user) {
            throw new Error(
              'The backend response does not contain the updated user'
            );
          }

          return user;
        })
      );
  }

  deleteUser(id: string): Observable<unknown> {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}