export type StockAction = 'Add' | 'Remove' | 'Update';
export interface StockMovement {
  id: string;
  product: string;
  sku: string;
  image: string[];
  category: string;
  action: StockAction;
  oldQty: number;
  newQty: number;
  performedBy: string;
  date: string; // ISO
}

export interface StatCard {
  label: string;
  value: string;
  period: string;
  trend: string;
  icon: 'box' | 'up' | 'down' | 'refresh';
}