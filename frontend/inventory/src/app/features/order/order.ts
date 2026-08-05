import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { iOrder } from '../../models/iOrder';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { iSupplier } from '../../models/iSupplier';
import { SupplierService } from '../../../services/supplier.service';
@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, Sidebar],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Order {
  SUPPLIERS: iSupplier[] = [];

  constructor(
    private supplierService: SupplierService,
    private cdr: ChangeDetectorRef,
  ) {
    this.supplierService.getSuppliers().subscribe({
      next: (res: any) => {
        this.SUPPLIERS = res.data;
        this.cdr.detectChanges();
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {},
    });
  }

  orders: iOrder[] = [
    {
      orderNumber: 'ORD-2026-0042',
      type: 'BUY',
      supplier: 'SUP-PHARMA-007',
      products: [
        'Aspirin 500mg (100 tablets)',
        'Ibuprofen 200mg (50 tablets)',
        'Paracetamol 650mg (60 tablets)',
      ],
      totalAmount: 2750.5,
      status: 'shipped',
      createdBy: 'USER-ADMIN-001',
    },
    {
      orderNumber: 'ORD-2026-0089',
      type: 'SELL',
      supplier: 'SUP-ELECTRONICS-023',
      products: ['MacBook Pro 14" M3 Pro', 'AirPods Pro 2nd Gen'],
      totalAmount: 2150.0,
      status: 'delivered',
      createdBy: 'USER-SALES-003',
    },
    {
      orderNumber: 'ORD-2026-0115',
      type: 'BUY',
      supplier: 'SUP-FURNITURE-012',
      products: [
        'Ergonomic Office Chair',
        'Standing Desk 48"',
        'Monitor Arm Mount',
        'Desk Lamp LED',
      ],
      totalAmount: 1425.75,
      status: 'pending',
      createdBy: 'USER-PROCUREMENT-007',
    },
  ];

  // Modal state
  selectedOrder: iOrder | null = null;
  showModal = false;

  viewOrder(order: iOrder): void {
    this.selectedOrder = order;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedOrder = null;
  }

  cancelOrder(order: iOrder): void {
    if (order.status === 'cancelled' || order.status === 'delivered') {
      return;
    }

    const confirmed = confirm(
      `Are you sure you want to cancel order ${order.orderNumber}? This cannot be undone.`,
    );
    if (!confirmed) return;

    // Update status
    const target = this.orders.find((o) => o.orderNumber === order.orderNumber);
    if (target) target.status = 'cancelled';
    if (this.selectedOrder && this.selectedOrder.orderNumber === order.orderNumber) {
      this.selectedOrder.status = 'cancelled';
    }
    alert(`Order ${order.orderNumber} has been cancelled successfully.`);
    this.closeModal();
  }

  //get supplier id
}
