export interface ApiResponse<T> {
  success?: boolean;
  count?: number;
  total?: number;
  page?: number;
  pages?: number;
  message?: string;
  msg?: string;
  data: T;
  token?: string;
}
