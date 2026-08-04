import { Routes } from '@angular/router';
import { ProductsList } from './features/products/components/products-list/products-list';
import { Login } from './features/auth/components/login/login';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'products', component: ProductsList },
];