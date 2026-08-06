import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Category } from '../../models/category';
import { API_BASE_URL } from '../api-url';
import { ApiResponse } from './api-response';

export interface CategoryPayload {
  name: string;
  description: string;
  isActive: boolean;
}

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  getCategories() {
    return this.http
      .get<ApiResponse<Category[]>>(`${this.apiBaseUrl}/categories`)
      .pipe(map((response) => response.data));
  }

  createCategory(payload: CategoryPayload) {
    return this.http
      .post<ApiResponse<Category>>(`${this.apiBaseUrl}/categories`, payload)
      .pipe(map((response) => response.data));
  }

  updateCategory(id: string, payload: CategoryPayload) {
    return this.http
      .put<ApiResponse<Category>>(`${this.apiBaseUrl}/categories/${id}`, payload)
      .pipe(map((response) => response.data));
  }

  deleteCategory(id: string) {
    return this.http.delete<ApiResponse<never>>(`${this.apiBaseUrl}/categories/${id}`);
  }
}
