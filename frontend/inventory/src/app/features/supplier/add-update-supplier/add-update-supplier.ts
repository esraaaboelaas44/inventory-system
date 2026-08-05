import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Sidebar } from '../../../shared/components/sidebar/sidebar';
import { FormsModule } from '@angular/forms';
import { SupplierService } from '../../../../services/supplier.service';
import { iSupplier } from '../../../models/iSupplier';
@Component({
  selector: 'app-add-update-supplier',
  standalone: true,
  imports: [CommonModule, Sidebar, FormsModule],
  templateUrl: './add-update-supplier.html',
  styleUrls: ['./add-update-supplier.css'],
})
export class AddUpdateSupplier {
  constructor(private SupplierService: SupplierService) {}

  newSupplier: iSupplier = {
    name: '',
    industry: '',
    email: '',
    phone: '',
    address: '',
    contactPerson: {
      name: '',
      email: '',
      phone: '',
    },
  };

  addSupplier() {
    this.SupplierService.addSupplier(this.newSupplier).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('You successfully added a Supplier');
        console.log(this.newSupplier);
        alert('Supplier Added Successfully!');
      },
    });
  }
}
