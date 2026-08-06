import { Component } from '@angular/core';
import { Sidebar } from '../../../shared/components/sidebar/sidebar';
import { FormsModule, NgModel } from '@angular/forms';
import { iSupplier } from '../../../models/iSupplier';
import { SupplierService } from '../../../../services/supplier.service';
@Component({
  selector: 'app-edit-supplier',
  imports: [Sidebar, FormsModule],
  templateUrl: './edit-supplier.html',
  styleUrl: './edit-supplier.css',
})
export class EditSupplier {
  id!: any;

  constructor(private SupplierService: SupplierService) {}
  // localStorage.getItem('id');
  editSupplier() {
    // this.id = localStorage.getItem('id');
    // console.log('New id from edit', this.id);
    // //get data
    // this.SupplierService.editSupplier(this.id, data).subscirbe({
    //   next: () => {},
    //   error: () => {},
    //   complete: () => {},
    // });
  }
}
