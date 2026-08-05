import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Product } from '../../../../models/product';
import { Sidebar } from '../../../../shared/components/sidebar/sidebar';

interface Category {
  _id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Sidebar],
  templateUrl: './products-list.html',
  styleUrls: ['./products-list.css'],
})
export class ProductsList {
  private readonly fb = inject(FormBuilder);

  products: Product[] = [
    {
      _id: '1',
      name: 'Samsung Galaxy A13',
      sku: 'ELEC-101',
      description: 'Samsung Galaxy A13 - Electronics',
      category: { _id: 'c1', name: 'Electronics' },
      supplier: { _id: 's1', name: 'Cairo Tech Distributors' },
      price: 220.0,
      quantity: 40,
      lowStockThreshold: 10,
      status: 'active',
      isLowStock: false,
    },
    {
      _id: '2',
      name: 'iPhone 13',
      sku: 'ELEC-102',
      description: 'iPhone 13 - Electronics',
      category: { _id: 'c1', name: 'Electronics' },
      supplier: { _id: 's1', name: 'Cairo Tech Distributors' },
      price: 799.0,
      quantity: 8,
      lowStockThreshold: 10,
      status: 'active',
      isLowStock: true,
    },
    {
      _id: '3',
      name: 'Dell Inspiron 15',
      sku: 'ELEC-103',
      description: 'Dell Inspiron 15 - Electronics',
      category: { _id: 'c1', name: 'Electronics' },
      supplier: { _id: 's1', name: 'Cairo Tech Distributors' },
      price: 520.0,
      quantity: 15,
      lowStockThreshold: 5,
      status: 'active',
      isLowStock: false,
    },
    {
      _id: '4',
      name: 'Sony WH-1000XM4',
      sku: 'ELEC-104',
      description: 'Sony WH-1000XM4 - Electronics',
      category: { _id: 'c1', name: 'Electronics' },
      supplier: { _id: 's1', name: 'Cairo Tech Distributors' },
      price: 279.0,
      quantity: 3,
      lowStockThreshold: 5,
      status: 'active',
      isLowStock: true,
    },
    {
      _id: '5',
      name: 'A4 Notebook',
      sku: 'OFF-101',
      description: 'A4 Notebook - Office Supplies',
      category: { _id: 'c2', name: 'Office Supplies' },
      supplier: { _id: 's2', name: 'Delta Office Supplies Co.' },
      price: 3.25,
      quantity: 200,
      lowStockThreshold: 30,
      status: 'active',
      isLowStock: false,
    },
    {
      _id: '6',
      name: 'Office Chair',
      sku: 'FUR-101',
      description: 'Office Chair - Furniture',
      category: { _id: 'c3', name: 'Furniture' },
      supplier: { _id: 's3', name: 'Alexandria Furniture Works' },
      price: 149.99,
      quantity: 2,
      lowStockThreshold: 5,
      status: 'inactive',
      isLowStock: true,
    },
  ];

  categoriesData: Category[] = [
    {
      _id: 'c1',
      name: 'Electronics',
      description: 'Phones, laptops, headphones, and accessories.',
      status: 'active',
    },
    {
      _id: 'c2',
      name: 'Office Supplies',
      description: 'Daily workspace materials and stationery.',
      status: 'active',
    },
    {
      _id: 'c3',
      name: 'Furniture',
      description: 'Desks, chairs, shelves, and fixtures.',
      status: 'inactive',
    },
  ];

  viewMode: 'products' | 'categories' = 'products';
  searchTerm = '';
  statusFilter = 'All Status';
  categoryFilter = 'All Categories';
  pageSize = 4;
  currentPage = 1;
  showForm = false;
  isEditing = false;
  showCategoryForm = false;
  isEditingCategory = false;

  productForm = this.fb.nonNullable.group({
    _id: [''],
    name: ['', [Validators.required, Validators.minLength(3)]],
    sku: ['', [Validators.required, Validators.pattern(/^[A-Z0-9]+-[0-9]+$/)]],
    description: ['', [Validators.required, Validators.minLength(8)]],
    categoryName: ['', Validators.required],
    supplierName: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0.01)]],
    quantity: [0, [Validators.required, Validators.min(0)]],
    lowStockThreshold: [10, [Validators.required, Validators.min(0)]],
    status: ['active' as 'active' | 'inactive', Validators.required],
  });

  categoryForm = this.fb.nonNullable.group({
    _id: [''],
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(8)]],
    status: ['active' as 'active' | 'inactive', Validators.required],
  });

  get categories(): string[] {
    return Array.from(new Set(this.categoriesData.map((c) => c.name)));
  }

  get filtered(): Product[] {
    let result = this.products;
    const term = this.searchTerm.trim().toLowerCase();
    if (term)
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.sku.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term),
      );
    if (this.statusFilter !== 'All Status')
      result = result.filter((p) => p.status === this.statusFilter.toLowerCase());
    if (this.categoryFilter !== 'All Categories')
      result = result.filter((p) => p.category.name === this.categoryFilter);
    return result;
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filtered.length / this.pageSize));
  }
  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  get filteredProducts(): Product[] {
    return this.filtered.slice(
      (this.currentPage - 1) * this.pageSize,
      this.currentPage * this.pageSize,
    );
  }

  productCount(categoryName: string): number {
    return this.products.filter((p) => p.category.name === categoryName).length;
  }
  control(name: string): AbstractControl | null {
    return this.productForm.get(name);
  }
  categoryControl(name: string): AbstractControl | null {
    return this.categoryForm.get(name);
  }
  isInvalid(name: string): boolean {
    const c = this.control(name);
    return !!c && c.invalid && (c.touched || c.dirty);
  }
  isCategoryInvalid(name: string): boolean {
    const c = this.categoryControl(name);
    return !!c && c.invalid && (c.touched || c.dirty);
  }

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
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
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
  onFilterChange() {
    this.currentPage = 1;
  }
  showProducts() {
    this.viewMode = 'products';
  }
  showCategories() {
    this.viewMode = 'categories';
    this.closeForm();
  }

  openAddForm() {
    this.productForm.reset({
      _id: '',
      name: '',
      sku: '',
      description: '',
      categoryName: '',
      supplierName: '',
      price: 0,
      quantity: 0,
      lowStockThreshold: 10,
      status: 'active',
    });
    this.isEditing = false;
    this.showForm = true;
  }

  openEditForm(product: Product) {
    this.productForm.reset({
      _id: product._id,
      name: product.name,
      sku: product.sku,
      description: product.description,
      categoryName: product.category.name,
      supplierName: product.supplier.name,
      price: product.price,
      quantity: product.quantity,
      lowStockThreshold: product.lowStockThreshold,
      status: product.status,
    });
    this.isEditing = true;
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
  }

  saveProduct() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    const value = this.productForm.getRawValue();
    const category = this.categoriesData.find((c) => c.name === value.categoryName) ?? {
      _id: `c-${Date.now()}`,
      name: value.categoryName,
      description: 'Created from product form.',
      status: 'active' as const,
    };
    if (!this.categoriesData.some((c) => c.name === value.categoryName))
      this.categoriesData.push(category);
    const product: Product = {
      _id: value._id || String(Date.now()),
      name: value.name.trim(),
      sku: value.sku.trim().toUpperCase(),
      description: value.description.trim(),
      category: { _id: category._id, name: category.name },
      supplier: {
        _id: `s-${value.supplierName.toLowerCase().replace(/\s+/g, '-')}`,
        name: value.supplierName.trim(),
      },
      price: value.price,
      quantity: value.quantity,
      lowStockThreshold: value.lowStockThreshold,
      status: value.status,
      isLowStock: value.quantity <= value.lowStockThreshold,
    };
    if (this.isEditing)
      this.products = this.products.map((p) => (p._id === product._id ? product : p));
    else this.products = [...this.products, product];
    this.showForm = false;
  }

  deleteProduct(product: Product) {
    if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    this.products = this.products.filter((p) => p._id !== product._id);
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
  }

  openAddCategoryForm() {
    this.categoryForm.reset({ _id: '', name: '', description: '', status: 'active' });
    this.isEditingCategory = false;
    this.showCategoryForm = true;
  }

  openEditCategoryForm(category: Category) {
    this.categoryForm.reset(category);
    this.isEditingCategory = true;
    this.showCategoryForm = true;
  }

  closeCategoryForm() {
    this.showCategoryForm = false;
  }

  saveCategory() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }
    const value = this.categoryForm.getRawValue();
    const category: Category = {
      ...value,
      _id: value._id || `c-${Date.now()}`,
      name: value.name.trim(),
      description: value.description.trim(),
    };
    if (this.isEditingCategory) {
      const oldName = this.categoriesData.find((c) => c._id === category._id)?.name;
      this.categoriesData = this.categoriesData.map((c) => (c._id === category._id ? category : c));
      if (oldName)
        this.products = this.products.map((p) =>
          p.category.name === oldName
            ? { ...p, category: { _id: category._id, name: category.name } }
            : p,
        );
    } else {
      this.categoriesData = [...this.categoriesData, category];
    }
    this.showCategoryForm = false;
  }

  deleteCategory(category: Category) {
    if (this.productCount(category.name) > 0) {
      alert('Move or delete products in this category first.');
      return;
    }
    if (!confirm(`Delete "${category.name}" category?`)) return;
    this.categoriesData = this.categoriesData.filter((c) => c._id !== category._id);
  }

  onSidebarTabSelected(tab: string) {
    if (tab !== 'Products') alert(`${tab} page isn't built yet.`);
  }
  onSidebarLogout() {
    alert("Logout isn't wired up yet.");
  }
}
