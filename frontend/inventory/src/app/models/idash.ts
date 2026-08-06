export type MoveAction = 'Add' | 'Remove' | 'Update';

/* كارت الإحصائيات العلوي */
export interface StatCard {
  label: string;
  value: number;
  trend: string;
  trendUp: boolean;
  note: string;
  icon: 'box' | 'layers' | 'truck' | 'alert';
  tone: 'teal' | 'green' | 'orange' | 'red';
}

/* سطر في جدول آخر الحركات */
export interface dashboard {
  product: string;
  sku: string;
  image: string[];
  action: MoveAction;
  quantity: number;
  performedBy: string;
  date: string; // ISO
}

/* شريحة في رسم الدونات */
export interface CategorySlice {
  name: string;
  count: number;
  percent: number;
  color: string;
}

/* منتج في لستة النواقص */
export interface LowStockItem {
  product: string;
  sku: string;
  image: string[];
  left: number;
  threshold: number; // الحد الأدنى المطلوب (لحساب نسبة الشريط)
}
