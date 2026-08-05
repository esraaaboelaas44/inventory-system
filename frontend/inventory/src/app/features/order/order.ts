import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { iOrder } from '../../models/iOrder';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { iSupplier } from '../../models/iSupplier';
import { SupplierService } from '../../../services/supplier.service';
import { OrderService } from '../../../services/order.service';
@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, Sidebar],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Order {
  SUPPLIERS: iSupplier[] = [];
  orders: iOrder[] = [];

  constructor(
    private supplierService: SupplierService,
    private orderService: OrderService,
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

    //orders
    this.orderService.getOrders().subscribe({
      next: (res: any) => {
        console.log(res);
        this.orders = res.data;
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {},
    });

    console.log(this.orders);
  }

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
