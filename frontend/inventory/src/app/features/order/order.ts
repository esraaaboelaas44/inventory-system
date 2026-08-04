import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { iOrder } from '../../models/iOrder';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { iSupplier } from '../../models/iSupplier';
@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, Sidebar],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Order {
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

  SUPPLIERS: iSupplier[] = [
    {
      name: 'PharmaCare Solutions Ltd',
      email: 'info@pharmacare.com',
      phone: '+1 (555) 234-5678',
      address: '123 Medical Boulevard, Suite 400, Boston, MA 02115, USA',
      contactPerson: {
        name: 'Dr. Sarah Johnson',
        email: 's.johnson@pharmacare.com',
        phone: '+1 (555) 234-5679',
      },
      isActive: true,
      industry: 'Pharmaceuticals',
    },
    {
      name: 'TechCore Electronics Inc',
      email: 'sales@techcore.com',
      phone: '+1 (555) 789-0123',
      address: '456 Innovation Drive, Silicon Valley, CA 94043, USA',
      contactPerson: {
        name: 'Michael Chen',
        email: 'm.chen@techcore.com',
        phone: '+1 (555) 789-0124',
      },
      isActive: true,
      industry: 'Electronics',
    },
    {
      name: 'Heritage Furniture Co',
      email: 'info@heritagefurniture.com',
      phone: '+1 (555) 345-6789',
      address: '789 Oak Street, Suite 200, High Point, NC 27260, USA',
      contactPerson: {
        name: 'Emily Rodriguez',
        email: 'e.rodriguez@heritagefurniture.com',
        phone: '+1 (555) 345-6790',
      },
      isActive: false,
      industry: 'Furniture',
    },
    {
      name: 'MediPharm International',
      email: 'contact@medipharm.com',
      phone: '+1 (555) 456-7890',
      address: '321 Health Sciences Park, San Diego, CA 92121, USA',
      contactPerson: {
        name: 'Dr. Robert Kim',
        email: 'r.kim@medipharm.com',
        phone: '+1 (555) 456-7891',
      },
      isActive: true,
      industry: 'Pharmaceuticals',
    },
    {
      name: 'Digital Wave Electronics',
      email: 'info@digitalwave.com',
      phone: '+1 (555) 567-8901',
      address: '987 Tech Park Avenue, Austin, TX 78701, USA',
      contactPerson: {
        name: 'Lisa Park',
        email: 'l.park@digitalwave.com',
        phone: '+1 (555) 567-8902',
      },
      isActive: true,
      industry: 'Electronics',
    },
    {
      name: 'Nordic Pharma AS',
      email: 'info@nordicpharma.com',
      phone: '+45 33 44 55 66',
      address: 'Hvidovrevej 123, 2650 Hvidovre, Copenhagen, Denmark',
      contactPerson: {
        name: 'Lars Andersen',
        email: 'l.andersen@nordicpharma.com',
        phone: '+45 33 44 55 67',
      },
      isActive: false,
      industry: 'Pharmaceuticals',
    },
    {
      name: 'Urban Living Furniture',
      email: 'showroom@urbanliving.com',
      phone: '+1 (555) 678-9012',
      address: '456 Design District, Portland, OR 97201, USA',
      contactPerson: {
        name: 'James Martinez',
        email: 'j.martinez@urbanliving.com',
        phone: '+1 (555) 678-9013',
      },
      isActive: true,
      industry: 'Furniture',
    },
    {
      name: 'SolarTech Electronics',
      email: 'info@solartech.com',
      phone: '+1 (555) 789-0123',
      address: '789 Renewable Energy Blvd, Phoenix, AZ 85001, USA',
      contactPerson: {
        name: 'Dr. Amara Singh',
        email: 'a.singh@solartech.com',
        phone: '+1 (555) 789-0124',
      },
      isActive: true,
      industry: 'Electronics',
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

    // Update in the underlying array so the table reflects the change too
    const target = this.orders.find((o) => o.orderNumber === order.orderNumber);
    if (target) target.status = 'cancelled';

    this.closeModal();
  }
}
