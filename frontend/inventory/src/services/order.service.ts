import { inject, Injectable } from '@angular/core';
import { iOrder } from '../app/models/iOrder';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private http = inject(HttpClient);

  getOrders() {
    return this.http.get<{ msg: string; data: iOrder[] }>('http://localhost:5000/api/orders');
  }

  getOrderDetails(id: string) {
    console.log('[OrderService] requesting id:', id);
    return this.http.get<{ msg: string; data: iOrder }>(
      `http://localhost:5000/api/orders/app-detailed-order/${id}`,
    );
  }
}
