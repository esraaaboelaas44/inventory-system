import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { dashboard } from '../models/idash';

@Service()
export class DashService 
{
    private http = inject(HttpClient);

  getStock(): any {
    return this.http.get<dashboard>('http://localhost:5000/api/stocks');
  }
  getStockLow(): any {
    return this.http.get<dashboard>('http://localhost:5000/api/stocks/low');
  }
}
