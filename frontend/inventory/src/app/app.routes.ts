import { Routes } from '@angular/router';
import { ProductsList } from './features/products/components/products-list/products-list';
import { Login } from './features/auth/components/login/login';
import { AddUpdateSupplier } from './features/supplier/add-update-supplier/add-update-supplier';
import { Supplier } from './features/supplier/supplier';
import { Order } from './features/order/order';
import { DetailedOrder } from './features/order/detailed-order/detailed-order';
import { GetSupplier } from './features/supplier/get-supplier/get-supplier';
import { EditSupplier } from './features/supplier/edit-supplier/edit-supplier';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'products', component: ProductsList },
  {
    path: 'supplier',
    children: [
      { path: '', component: Supplier },
      { path: 'add-update-supplier', component: AddUpdateSupplier },
      { path: 'app-get-supplier', component: GetSupplier },
      { path: 'app-edit-supplier', component: EditSupplier },
    ],
  },
  {
    path: 'order',
    children: [
      { path: '', component: Order },
      { path: 'app-detailed-order', component: DetailedOrder },
    ],
  },
];
