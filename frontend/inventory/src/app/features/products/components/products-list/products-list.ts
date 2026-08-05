import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Product } from '../../../../models/product';
import { Category } from '../../../../models/category';
import { Supplier } from '../../../../models/supplier';
import { CategoryService } from '../../../../core/services/category.service';
import { ProductPayload, ProductService } from '../../../../core/services/product.service';
import { SupplierService } from '../../../../core/services/supplier.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Sidebar } from '../../../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Sidebar],
  templateUrl: './products-list.html',
  styleUrls: ['./products-list.css'],
})
export class ProductsList implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly productService = inject(ProductService);
  private readonly categoryService = inject(CategoryService);
  private readonly supplierService = inject(SupplierService);
  private readonly authService = inject(AuthService);

  products: Product[] = [];
  categoriesData: Category[] = [];
  suppliersData: Supplier[] = [];
  isLoading = false;
  errorMessage = '';
  toastMessage = '';
  toastType: 'success' | 'info' | 'error' = 'info';
  pendingActionId = '';
  pendingActionType: 'product-delete' | 'category-delete' | 'product-save' | 'category-save' | '' =
    '';
  deleteConfirmation: { type: 'product' | 'category'; id: string; name: string } | null = null;

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

  get currentRole(): string {
    return this.authService.getCurrentUser()?.role?.toLowerCase() ?? 'staff';
  }

  get canEditInventory(): boolean {
    return this.currentRole === 'admin' || this.currentRole === 'manager';
  }

  get canDeleteInventory(): boolean {
    return this.currentRole === 'admin';
  }

  ngOnInit(): void {
    this.loadInventoryData();
  }

  private loadInventoryData(): void {
    this.isLoading = true;
    this.errorMessage = '';

    forkJoin({
      products: this.productService.getProducts(),
      categories: this.categoryService.getCategories(),
      suppliers: this.supplierService.getSuppliers(),
    }).subscribe({
      next: ({ products, categories, suppliers }) => {
        this.products = products;
        this.categoriesData = categories.map((category) => this.normalizeCategory(category));
        this.suppliersData = suppliers;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.error?.message ?? 'Unable to load inventory data.';
        this.isLoading = false;
      },
    });
  }

  private normalizeCategory(category: Category): Category {
    return {
      ...category,
      status: category.isActive === false ? 'inactive' : 'active',
    };
  }

  private toCategoryPayload(category: Category) {
    return {
      name: category.name,
      description: category.description,
      isActive: category.status === 'active',
    };
  }

  private toProductPayload(
    value: ReturnType<typeof this.productForm.getRawValue>,
  ): ProductPayload | null {
    const category = this.categoriesData.find((c) => c.name === value.categoryName);
    const supplier = this.suppliersData.find((s) => s.name === value.supplierName);

    if (!category || !supplier) {
      this.showToast('Please select an existing category and supplier before saving.', 'error');
      return null;
    }

    return {
      name: value.name.trim(),
      sku: value.sku.trim().toUpperCase(),
      description: value.description.trim(),
      category: category._id,
      supplier: supplier._id,
      price: value.price,
      quantity: value.quantity,
      lowStockThreshold: value.lowStockThreshold,
      status: value.status,
    };
  }

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
    if (!this.canEditInventory) {
      this.showToast('Your role can view products, but cannot add them.', 'error');
      return;
    }
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
    if (!this.canEditInventory) {
      this.showToast('Your role can view products, but cannot edit them.', 'error');
      return;
    }
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
    if (!this.canEditInventory) {
      this.showToast('Your role can view products, but cannot add or edit them.', 'error');
      return;
    }
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const value = this.productForm.getRawValue();
    const payload = this.toProductPayload(value);
    if (!payload) return;

    const request =
      this.isEditing && value._id
        ? this.productService.updateProduct(value._id, payload)
        : this.productService.createProduct(payload);

    this.pendingActionType = 'product-save';
    this.pendingActionId = value._id || 'new-product';
    this.showToast(
      this.isEditing ? `Saving changes to ${value.name}...` : `Adding ${value.name}...`,
      'info',
    );

    request.subscribe({
      next: () => {
        this.loadInventoryData();
        this.showForm = false;
        this.clearPendingAction();
        this.showToast(
          this.isEditing ? 'Product updated successfully.' : 'Product added successfully.',
          'success',
        );
      },
      error: (error) => {
        this.clearPendingAction();
        this.showToast(error.error?.message ?? 'Unable to save product.', 'error');
      },
    });
  }

  requestDeleteProduct(product: Product) {
    if (!this.canDeleteInventory) {
      this.showToast('Only admins can delete products.', 'error');
      return;
    }
    this.deleteConfirmation = { type: 'product', id: product._id, name: product.name };
    this.showToast(`Review the delete confirmation for ${product.name}.`, 'info');
  }

  deleteProduct(product: Product) {
    if (!this.canDeleteInventory) {
      this.showToast('Only admins can delete products.', 'error');
      return;
    }
    this.pendingActionType = 'product-delete';
    this.pendingActionId = product._id;
    this.showToast(`Deleting ${product.name}...`, 'info');

    this.productService.deleteProduct(product._id).subscribe({
      next: () => {
        this.products = this.products.filter((p) => p._id !== product._id);
        if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
        this.deleteConfirmation = null;
        this.clearPendingAction();
        this.showToast('Product deleted successfully.', 'success');
      },
      error: (error) => {
        this.clearPendingAction();
        this.showToast(error.error?.message ?? 'Unable to delete product.', 'error');
      },
    });
  }

  openAddCategoryForm() {
    if (!this.canEditInventory) {
      this.showToast('Your role can view categories, but cannot add them.', 'error');
      return;
    }
    this.categoryForm.reset({ _id: '', name: '', description: '', status: 'active' });
    this.isEditingCategory = false;
    this.showCategoryForm = true;
  }

  openEditCategoryForm(category: Category) {
    if (!this.canEditInventory) {
      this.showToast('Your role can view categories, but cannot edit them.', 'error');
      return;
    }
    this.categoryForm.reset(category);
    this.isEditingCategory = true;
    this.showCategoryForm = true;
  }

  closeCategoryForm() {
    this.showCategoryForm = false;
  }

  saveCategory() {
    if (!this.canEditInventory) {
      this.showToast('Your role can view categories, but cannot add or edit them.', 'error');
      return;
    }
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    const value = this.categoryForm.getRawValue();
    const category: Category = {
      ...value,
      name: value.name.trim(),
      description: value.description.trim(),
    };
    const payload = this.toCategoryPayload(category);
    const request =
      this.isEditingCategory && value._id
        ? this.categoryService.updateCategory(value._id, payload)
        : this.categoryService.createCategory(payload);

    this.pendingActionType = 'category-save';
    this.pendingActionId = value._id || 'new-category';
    this.showToast(
      this.isEditingCategory ? `Saving changes to ${value.name}...` : `Adding ${value.name}...`,
      'info',
    );

    request.subscribe({
      next: () => {
        this.loadInventoryData();
        this.showCategoryForm = false;
        this.clearPendingAction();
        this.showToast(
          this.isEditingCategory
            ? 'Category updated successfully.'
            : 'Category added successfully.',
          'success',
        );
      },
      error: (error) => {
        this.clearPendingAction();
        this.showToast(error.error?.message ?? 'Unable to save category.', 'error');
      },
    });
  }

  requestDeleteCategory(category: Category) {
    if (!this.canDeleteInventory) {
      this.showToast('Only admins can delete categories.', 'error');
      return;
    }
    if (this.productCount(category.name) > 0) {
      this.showToast('Move or delete products in this category first.', 'error');
      return;
    }
    this.deleteConfirmation = { type: 'category', id: category._id, name: category.name };
    this.showToast(`Review the delete confirmation for ${category.name}.`, 'info');
  }

  deleteCategory(category: Category) {
    if (!this.canDeleteInventory) {
      this.showToast('Only admins can delete categories.', 'error');
      return;
    }
    this.pendingActionType = 'category-delete';
    this.pendingActionId = category._id;
    this.showToast(`Deleting ${category.name}...`, 'info');

    this.categoryService.deleteCategory(category._id).subscribe({
      next: () => {
        this.categoriesData = this.categoriesData.filter((c) => c._id !== category._id);
        this.deleteConfirmation = null;
        this.clearPendingAction();
        this.showToast('Category deleted successfully.', 'success');
      },
      error: (error) => {
        this.clearPendingAction();
        this.showToast(error.error?.message ?? 'Unable to delete category.', 'error');
      },
    });
  }

  confirmDelete() {
    if (!this.deleteConfirmation) return;
    if (this.deleteConfirmation.type === 'product') {
      const product = this.products.find((p) => p._id === this.deleteConfirmation?.id);
      if (product) this.deleteProduct(product);
      return;
    }
    const category = this.categoriesData.find((c) => c._id === this.deleteConfirmation?.id);
    if (category) this.deleteCategory(category);
  }

  cancelDelete() {
    this.deleteConfirmation = null;
    this.showToast('Delete cancelled.', 'info');
  }

  private showToast(message: string, type: 'success' | 'info' | 'error' = 'info') {
    this.toastMessage = message;
    this.toastType = type;
  }

  private clearPendingAction() {
    this.pendingActionId = '';
    this.pendingActionType = '';
  }

  onSidebarTabSelected(tab: string) {
    if (tab !== 'Products') alert(`${tab} page isn't built yet.`);
  }
  onSidebarLogout() {
    alert("Logout isn't wired up yet.");
  }
}
