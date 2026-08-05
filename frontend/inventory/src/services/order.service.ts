import { inject, Service } from '@angular/core';
import { iOrder } from '../app/models/iOrder';
import { HttpClient } from '@angular/common/http';
@Service()
export class OrderService {
  orders: iOrder[] = [];
  private http = inject(HttpClient);
  getOrders(): any {
    return this.http.get<iOrder>('http://localhost:5000/api/orders');
  }
  getOrderDetails(id: string) {
    return this.http.get<{ msg: string; data: iOrder }>(
      `http://localhost:5000/api/orders/app-detailed-order/${id}`,
    );
  }
}
