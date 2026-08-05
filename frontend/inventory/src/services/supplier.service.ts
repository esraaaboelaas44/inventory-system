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
    if (this.SUPPLIERS.length > 0) {
      return of(this.SUPPLIERS);
    }
    //kk

    return this.http.get<iSupplierRes>('http://localhost:61272/api/suppliers/').pipe(
      tap((res) => {
        this.SUPPLIERS = res.data;
      }),
    );
  }
}
