import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../../../shared/components/sidebar/sidebar';
import { iSupplier } from '../../../models/iSupplier';
import { SupplierService } from '../../../../services/supplier.service';
import { SupplierCard } from './supplier-card/supplier-card';
@Component({
  selector: 'app-get-supplier',
  standalone: true,
  imports: [CommonModule, Sidebar, SupplierCard],
  templateUrl: './get-supplier.html',
  styleUrl: './get-supplier.css',
})
export class GetSupplier {
  SUPPLIERS: iSupplier[] = [];
  constructor(private SupplierService: SupplierService) {
    this.SupplierService.getSuppliers().subscribe({
      next: (res: any) => {
        this.SUPPLIERS = res;
        console.log('Suppliers loaded:', this.SUPPLIERS);
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
  // getSuppliers() {
  //   this.SupplierService.getSuppliers().subscribe({
  //     next: (res: any) => {
  //       console.log(res);
  //     },
  //   });
  // }
}
