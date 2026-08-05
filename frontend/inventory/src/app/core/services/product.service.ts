import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Product } from '../../models/product';
import { API_BASE_URL } from '../api-url';
import { ApiResponse } from './api-response';

export interface ProductPayload {
  name: string;
  sku: string;
  description: string;
  category: string;
  supplier: string;
  price: number;
  quantity: number;
  lowStockThreshold: number;
  status: 'active' | 'inactive';
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  getProducts(search = '') {
    let params = new HttpParams().set('limit', 1000);
    if (search.trim()) params = params.set('search', search.trim());

    return this.http
      .get<ApiResponse<Product[]>>(`${this.apiBaseUrl}/products`, { params })
      .pipe(map((response) => response.data));
  }

  createProduct(payload: ProductPayload) {
    return this.http
      .post<ApiResponse<Product>>(`${this.apiBaseUrl}/products`, payload)
      .pipe(map((response) => response.data));
  }

  updateProduct(id: string, payload: ProductPayload) {
    return this.http
      .put<ApiResponse<Product>>(`${this.apiBaseUrl}/products/${id}`, payload)
      .pipe(map((response) => response.data));
  }

  deleteProduct(id: string) {
    return this.http.delete<ApiResponse<never>>(`${this.apiBaseUrl}/products/${id}`);
  }
}
