import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../models/product';
import { Sidebar } from '../../../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, Sidebar],
  templateUrl: './products-list.html',
  styleUrls: ['./products-list.css']
})
export class ProductsList {

  // Hardcoded data for now — will be replaced with a real API call later
  products: Product[] = [
    {
      _id: '1', name: 'Samsung Galaxy A13', sku: 'ELEC-101',
      description: 'Samsung Galaxy A13 - Electronics',
      category: { _id: 'c1', name: 'Electronics' },
      supplier: { _id: 's1', name: 'Cairo Tech Distributors' },
      price: 220.00, quantity: 40, lowStockThreshold: 10,
      status: 'active', isLowStock: false,
    },
    {
      _id: '2', name: 'iPhone 13', sku: 'ELEC-102',
      description: 'iPhone 13 - Electronics',
      category: { _id: 'c1', name: 'Electronics' },
      supplier: { _id: 's1', name: 'Cairo Tech Distributors' },
      price: 799.00, quantity: 8, lowStockThreshold: 10,
      status: 'active', isLowStock: true,
    },
    {
      _id: '3', name: 'Dell Inspiron 15', sku: 'ELEC-103',
      description: 'Dell Inspiron 15 - Electronics',
      category: { _id: 'c1', name: 'Electronics' },
      supplier: { _id: 's1', name: 'Cairo Tech Distributors' },
      price: 520.00, quantity: 15, lowStockThreshold: 5,
      status: 'active', isLowStock: false,
    },
    {
      _id: '4', name: 'Sony WH-1000XM4', sku: 'ELEC-104',
      description: 'Sony WH-1000XM4 - Electronics',
      category: { _id: 'c1', name: 'Electronics' },
      supplier: { _id: 's1', name: 'Cairo Tech Distributors' },
      price: 279.00, quantity: 3, lowStockThreshold: 5,
      status: 'active', isLowStock: true,
    },
    {
      _id: '5', name: 'A4 Notebook', sku: 'OFF-101',
      description: 'A4 Notebook - Office Supplies',
      category: { _id: 'c2', name: 'Office Supplies' },
      supplier: { _id: 's2', name: 'Delta Office Supplies Co.' },
      price: 3.25, quantity: 200, lowStockThreshold: 30,
      status: 'active', isLowStock: false,
    },
    {
      _id: '6', name: 'Office Chair', sku: 'FUR-101',
      description: 'Office Chair - Furniture',
      category: { _id: 'c3', name: 'Furniture' },
      supplier: { _id: 's3', name: 'Alexandria Furniture Works' },
      price: 149.99, quantity: 2, lowStockThreshold: 5,
      status: 'inactive', isLowStock: true,
    },
  ];

  // ----- Filters -----
  searchTerm: string = '';
  statusFilter: string = 'All Status';
  categoryFilter: string = 'All Categories';

  onSearchInput(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.onFilterChange();
  }

  onStatusChange(event: Event) {
    this.statusFilter = (event.target as HTMLSelectElement).value;
    this.onFilterChange();
  }

  onCategoryChange(event: Event) {
    this.categoryFilter = (event.target as HTMLSelectElement).value;
    this.onFilterChange();
  }

  get categories(): string[] {
    const unique = new Set(this.products.map(p => p.category.name));
    return Array.from(unique);
  }

  get filtered(): Product[] {
    let result = this.products;

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.sku.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
      );
    }

    if (this.statusFilter !== 'All Status') {
      result = result.filter(p => p.status === this.statusFilter.toLowerCase());
    }

    if (this.categoryFilter !== 'All Categories') {
      result = result.filter(p => p.category.name === this.categoryFilter);
    }

    return result;
  }

  // ----- Pagination (client-side, since data is hardcoded) -----
  pageSize = 4;
  currentPage = 1;

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filtered.length / this.pageSize));
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get filteredProducts(): Product[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  nextPage() {
    this.goToPage(this.currentPage + 1);
  }

  previousPage() {
    this.goToPage(this.currentPage - 1);
  }

  resetCategoryFilter() {
    this.categoryFilter = 'All Categories';
    this.onFilterChange();
  }

  // Reset to page 1 whenever a filter changes, so results aren't hidden on an empty page
  onFilterChange() {
    this.currentPage = 1;
  }

  // ----- Add / Edit form -----
  showForm = false;
  isEditing = false;
  draft: Product = this.blankProduct();

  blankProduct(): Product {
    return {
      _id: '',
      name: '',
      sku: '',
      description: '',
      category: { _id: '', name: '' },
      supplier: { _id: '', name: '' },
      price: 0,
      quantity: 0,
      lowStockThreshold: 10,
      status: 'active',
      isLowStock: false,
    };
  }

  openAddForm() {
    this.draft = this.blankProduct();
    this.isEditing = false;
    this.showForm = true;
  }

  openEditForm(product: Product) {
    // Shallow-copy the nested objects too, so editing the draft doesn't mutate the table row live
    this.draft = {
      ...product,
      category: { ...product.category },
      supplier: { ...product.supplier },
    };
    this.isEditing = true;
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
  }

  // ----- Draft field change handlers (explicit, no ngModel) -----
  onDraftNameChange(event: Event) {
    this.draft.name = (event.target as HTMLInputElement).value;
  }

  onDraftSkuChange(event: Event) {
    this.draft.sku = (event.target as HTMLInputElement).value;
  }

  onDraftDescriptionChange(event: Event) {
    this.draft.description = (event.target as HTMLInputElement).value;
  }

  onDraftCategoryChange(event: Event) {
    this.draft.category.name = (event.target as HTMLInputElement).value;
  }

  onDraftSupplierChange(event: Event) {
    this.draft.supplier.name = (event.target as HTMLInputElement).value;
  }

  onDraftPriceChange(event: Event) {
    this.draft.price = Number((event.target as HTMLInputElement).value);
  }

  onDraftQuantityChange(event: Event) {
    this.draft.quantity = Number((event.target as HTMLInputElement).value);
  }

  onDraftLowStockThresholdChange(event: Event) {
    this.draft.lowStockThreshold = Number((event.target as HTMLInputElement).value);
  }

  onDraftStatusChange(event: Event) {
    this.draft.status = (event.target as HTMLSelectElement).value as 'active' | 'inactive';
  }

  saveProduct() {
    if (!this.draft.name.trim() || !this.draft.category.name.trim()) {
      alert('Product name and category are required.');
      return;
    }

    this.draft.isLowStock = this.draft.quantity <= this.draft.lowStockThreshold;

    if (this.isEditing) {
      const index = this.products.findIndex(p => p._id === this.draft._id);
      if (index !== -1) {
        this.products[index] = { ...this.draft };
      }
    } else {
      this.draft._id = String(Date.now());
      this.draft.sku = this.draft.sku || `SKU-${this.products.length + 1}`;
      this.products.push({ ...this.draft });
    }

    this.showForm = false;
  }

  deleteProduct(product: Product) {
    const confirmed = confirm(`Delete "${product.name}"? This cannot be undone.`);
    if (!confirmed) return;

    this.products = this.products.filter(p => p._id !== product._id);

    // If deleting the last item on the last page, step back a page so the view isn't empty
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
  }

  // ----- Sidebar events -----
  // Other tabs don't have pages yet — hook these up to real navigation
  // once those routes exist.
  onSidebarTabSelected(tab: string) {
    if (tab !== 'Products') {
      alert(`${tab} page isn't built yet.`);
    }
  }

  onSidebarLogout() {
    alert('Logout isn\'t wired up yet.');
  }

}
