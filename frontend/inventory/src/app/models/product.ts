export interface Product {
  _id: string;
  name: string;
  sku: string;
  description: string;
  category: { _id: string; name: string };
  supplier: { _id: string; name: string };
  price: number;
  quantity: number;
  lowStockThreshold: number;
  status: 'active' | 'inactive';
  isLowStock: boolean;
}