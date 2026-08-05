import { Component, Input } from '@angular/core';
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
}
