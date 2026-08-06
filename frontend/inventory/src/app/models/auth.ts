export interface LoggedInUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'staff';
}

export interface AuthModel {
  success: boolean;
  token: string;
  data: LoggedInUser;
}