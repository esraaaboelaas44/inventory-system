export interface iOrder {
  orderNumber: String;
  type: 'BUY' | 'SELL';
  supplier: String;
  products: String[];
  totalAmount: number;
  status: 'pending' | 'approved' | 'shipped' | 'delivered' | 'cancelled';
  createdBy: String;
}
