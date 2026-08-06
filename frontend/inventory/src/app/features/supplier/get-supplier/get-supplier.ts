import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../../../shared/components/sidebar/sidebar';
import { iSupplier } from '../../../models/iSupplier';
import { SupplierService } from '../../../../services/supplier.service';
import { SupplierCard } from './supplier-card/supplier-card';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-get-supplier',
  standalone: true,
  imports: [CommonModule, Sidebar, SupplierCard, RouterLink],
  templateUrl: './get-supplier.html',
  styleUrl: './get-supplier.css',
})
export class GetSupplier {
  SUPPLIERS: iSupplier[] = [];
  constructor(
    private SupplierService: SupplierService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {
    this.SupplierService.getSuppliers().subscribe({
      next: (res: any) => {
        this.SUPPLIERS = res.data;
        this.cdr.detectChanges();
        console.log('Suppliers loaded:', this.SUPPLIERS);
      },
      error: (err: any) => {
        console.error(err);
      },
    });
    console.log(this.SUPPLIERS);
  }

  deleteFun(e: any) {
    console.log(e);
    this.SupplierService.deleteSupplier(e).subscribe({
      next: (res: any) => {
        this.SUPPLIERS = res.data;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

  editFun(e: any) {
    console.log(e);
    localStorage.setItem('id', e);
    this.router.navigate(['/supplier/app-edit-supplier']);
  }
}
