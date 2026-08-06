import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  Observable,
  map
} from 'rxjs';

import { UserLog } from '../../models/user-log';

interface LogsResponse {
  logs?: UserLog[];
  data?: UserLog[];
}

@Injectable({
  providedIn: 'root'
})
export class UserLogService {

  private readonly apiUrl =
    'http://localhost:5000/api/auth-logs';

  constructor(private http: HttpClient) {}

  getLogs(): Observable<UserLog[]> {
    return this.http
      .get<UserLog[] | LogsResponse>(this.apiUrl)
      .pipe(
        map((response) => {
          if (Array.isArray(response)) {
            return response;
          }

          return response.logs ?? response.data ?? [];
        })
      );
  }
}