import { Service, inject } from '@angular/core';
import { iSupplier } from '../app/models/iSupplier';
import { iSupplierRes } from '../app/models/iSupplierRes';
import { HttpClient } from '@angular/common/http';
import { tap, map, of } from 'rxjs';

@Service()
export class SupplierService {
  private http = inject(HttpClient);

  SUPPLIERS: iSupplier[] = [];

  getSuppliers(): any {
    return this.http.get<iSupplierRes>('http://localhost:5000/api/suppliers/').pipe(
      tap((res) => {
        this.SUPPLIERS = res.data;
      }),
    );
  }

  addSupplier(data: iSupplier): any {
    return this.http.post('http://localhost:5000/api/suppliers', data);
  }
}
