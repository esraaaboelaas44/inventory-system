import { Component, computed, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockService, } from '../../services/stock.service';
import { StockMovement, StatCard,StockAction } from '../../models/istock';
import { Sidebar } from '../sidebar/sidebar';


@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [CommonModule, FormsModule,Sidebar],
  providers: [DatePipe],
  templateUrl: './stock.html',
  styleUrls: ['./stock.css'],
})

export class Stock  {


 movements = signal<StockMovement[]>([]);

constructor(private stockService: StockService) {

  this.stockService.getStock().subscribe({
    next: (res: any) => {

      this.movements.set(
        res.data.map((item: any) => ({
           id: item.id,
          product: item.product,
          sku: item.sku,

          image: [
            'M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z',
            'm3.3 7 8.7 5 8.7-5',
            'M12 22V12'
          ],

          category: item.category,
          action: item.action,

          oldQty: item.oldquantity,
          newQty: item.newquantity,

          performedBy: item.performedBy,
          date: item.date
        }))
      );


    },
  error: (err:any) => {console.log(err);}});


}
deleteMovement(id: string): void {

  this.stockService.deleteMovement(id).subscribe({

    next: () => {

      this.movements.update(items =>
        items.filter(item => item.id !== id)
      );

    },

    error: (err) => {
      console.log(err);
    }

  });

}



  /* ---- كروت الإحصائيات (أعلى الصفحة) ---- */
  stats = computed<StatCard[]>(() => {

  const data = this.movements();

  return [
    {
      label: 'Total Movements',
      value: data.length.toString(),
      period: 'This Month',
      trend: '12.5%',
      icon: 'box'
    },

    {
      label: 'Total Added',
      value: data.filter(m => m.action === 'Add').length.toString(),
      period: 'This Month',
      trend: '8.3%',
      icon: 'up'
    },

    {
      label: 'Total Removed',
      value: data.filter(m => m.action === 'Remove').length.toString(),
      period: 'This Month',
      trend: '6.1%',
      icon: 'down'
    },

    {
      label: 'Total Updated',
      value: data.filter(m => m.action === 'Update').length.toString(),
      period: 'This Month',
      trend: '4.7%',
      icon: 'refresh'
    }
  ];
});

  /* ---- خيارات الفلاتر ---- */
  actions: string[] = ['All Actions', 'Add', 'Remove', 'Update'];
  categories: string[] = ['All Categories', 'Electronics', 'Stationery', 'Sports & Outdoors'];
  users: string[] = ['All Users', 'Ahmed'];
  pageSizes: number[] = [10, 25, 50];

  /* ---- حالة الفلاتر (Signals) ---- */
  search = signal('');
  selectedAction = signal('All Actions');
  selectedCategory = signal('All Categories');
  selectedUser = signal('All Users');
  pageSize = signal(10);
  currentPage = signal(1);


  /* ---- Logic: تطبيق كل الفلاتر ---- */
  filtered = computed<StockMovement[]>(() => {
  const term = this.search().trim().toLowerCase();

  return this.movements().filter((m) => {
    const matchSearch =
      !term ||
      m.product.toLowerCase().includes(term) ||
      m.sku.toLowerCase().includes(term);

    const matchAction =
      this.selectedAction() === 'All Actions' ||
      m.action === this.selectedAction();

    const matchCategory =
      this.selectedCategory() === 'All Categories' ||
      m.category === this.selectedCategory();

    const matchUser =
      this.selectedUser() === 'All Users' ||
      m.performedBy === this.selectedUser();

    return matchSearch && matchAction && matchCategory && matchUser;
  });
});

  /* ---- Logic: الترقيم (Pagination) ---- */
  totalPages = computed(() => Math.max(1, Math.ceil(this.filtered().length / this.pageSize())));

  pages = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));

  paged = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filtered().slice(start, start + this.pageSize());
  });

  rangeStart = computed(() => (this.filtered().length ? (this.currentPage() - 1) * this.pageSize() + 1 : 0));
  rangeEnd = computed(() => Math.min(this.currentPage() * this.pageSize(), this.filtered().length));

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
  }

  onFilterChange(): void {
    this.currentPage.set(1);
  }

  onPageSizeChange(size: number | string): void {
    this.pageSize.set(Number(size));
    this.currentPage.set(1);
  }

  /* ---- Logic: حساب الفرق بين الكمية القديمة والجديدة ---- */
  change(m: StockMovement): number {
    return m.newQty - m.oldQty;
  }

  changeLabel(m: StockMovement): string {
    const diff = this.change(m);
    return diff > 0 ? `+${diff}` : `${diff}`;
  }

  changeClass(m: StockMovement): string {
    return this.change(m) >= 0 ? 'up' : 'down';
  }

  /* ---- Logic: كلاس الـ badge حسب نوع العملية ---- */
  badgeClass(action: StockAction): string {
    return `badge badge-${action.toLowerCase()}`;
  }

  /* ---- Logic: أول حرف من اسم المستخدم ---- */
  initial(name: string): string {
    return name.charAt(0).toUpperCase();
  }

  /* ---- تصدير البيانات ---- */
  exportData(): void {
    console.log('[v0] exporting rows:', this.filtered().length);
  }

  




  
}