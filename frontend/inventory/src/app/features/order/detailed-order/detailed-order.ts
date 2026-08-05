import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  AfterViewInit,
  OnInit,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { iOrder } from '../../../models/iOrder';
import { OrderService } from '../../../../services/order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detailed-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detailed-order.html',
  styleUrl: './detailed-order.css',
})
export class DetailedOrder implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() orderId: string | null = null;

  @Output() close = new EventEmitter<void>();

  order: any = null;
  loading = false;
  error: string | null = null;

  get subtotal(): number {
    return (this.order?.products ?? []).reduce((sum: number, p: any) => sum + (p.price || 0), 0);
  }

  private sub?: Subscription;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private orderService: OrderService,
  ) {}

  ngOnInit(): void {
    this.fetchOrder();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['orderId'] && !changes['orderId'].firstChange) {
      this.fetchOrder();
    }
  }

  private fetchOrder(): void {
    if (!this.orderId) return;

    this.loading = true;
    this.error = null;

    this.sub = this.orderService.getOrderDetails(this.orderId).subscribe({
      next: (res: any) => {
        this.order = res.data;
        this.loading = false;
      },
      error: (err: any) => {
        console.log(err);
        this.error = 'Could not load order details.';
        this.loading = false;
      },
    });
  }

  ngAfterViewInit(): void {
    const root = this.elementRef.nativeElement;

    const closeBtn = root.querySelector('.close-btn');
    closeBtn?.addEventListener('click', () => this.close.emit());

    const buttons = root.querySelectorAll('button');
    buttons.forEach((btn) => {
      if (btn.textContent?.trim() === 'Close') {
        btn.addEventListener('click', () => this.close.emit());
      }
    });

    const overlay = root.querySelector(':scope > div');
    overlay?.addEventListener('click', (event: Event) => {
      if (event.target === overlay) {
        this.close.emit();
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
