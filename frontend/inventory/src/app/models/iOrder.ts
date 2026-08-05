export interface iOrder {
  _id: string;
  createdAt: String;
  updatedAt: String;
  orderNumber: String;
  type: 'BUY' | 'SELL';
  supplier: String;
  products: String[];
  totalAmount: number;
  status: 'pending' | 'approved' | 'shipped' | 'delivered' | 'cancelled';
  createdBy: String;
}
