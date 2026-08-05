import { Component, Input, Output, EventEmitter } from '@angular/core';
import { iSupplier } from '../../../../models/iSupplier';

@Component({
  selector: 'app-supplier-card',
  imports: [],
  templateUrl: './supplier-card.html',
  styleUrl: './supplier-card.css',
})
export class SupplierCard {
  @Input()
  supplier!: iSupplier;
  @Output() deleteSupplier = new EventEmitter<String>();

  onDelete(event: Event): void {
    event.stopPropagation();

    console.log(`pressed delete on ${this.supplier.name}`);
    if (confirm(`Are you sure you want to delete ${this.supplier.name}?`)) {
      this.deleteSupplier.emit(`${this.supplier._id}`);
    }
    this.deleteSupplier.emit(this.supplier._id);
  }
}
