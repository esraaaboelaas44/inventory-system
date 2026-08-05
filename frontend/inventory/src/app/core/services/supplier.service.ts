import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Supplier } from '../../models/supplier';
import { API_BASE_URL } from '../api-url';
import { ApiResponse } from './api-response';

@Injectable({ providedIn: 'root' })
export class SupplierService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  getSuppliers() {
    return this.http
      .get<ApiResponse<Supplier[]>>(`${this.apiBaseUrl}/suppliers`)
      .pipe(map((response) => response.data));
  }
}
