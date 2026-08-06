export type UserRole = 'admin' | 'manager' | 'staff';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
}

export interface UpdateUserPayload {
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  password?: string;
}