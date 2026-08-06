import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StockMovement } from '../models/istock';

@Service()
export class StockService 
{
  private http = inject(HttpClient);

  getStock(): any {
    return this.http.get<StockMovement>('http://localhost:5000/api/stocks');
  }
  deleteMovement(id: string) {
  return this.http.delete(`${'http://localhost:5000/api/stocks/'+id}`);
}
}
