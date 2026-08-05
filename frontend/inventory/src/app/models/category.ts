export interface Category {
  _id: string;
  name: string;
  description: string;
  isActive?: boolean;
  status?: 'active' | 'inactive';
}
