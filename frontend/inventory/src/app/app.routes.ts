import { Routes } from '@angular/router';

import { ProductsList } from './features/products/components/products-list/products-list';
import { LoginComponent } from './features/auth/components/login/login';
import { AddUpdateSupplier } from './features/supplier/add-update-supplier/add-update-supplier';
import { Supplier } from './features/supplier/supplier';
import { Order } from './features/order/order';
import { authGuard } from './guards/auth.guard';
import { Users } from './features/auth/components/users/users';


export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
  path:'users',
  component: Users,
  canActivate:[authGuard]
  },

  {
    path: 'login',
    component: LoginComponent
  },


  {
    path: 'products',
    component: ProductsList,
    canActivate: [authGuard]
  },


  {
    path: 'supplier',
    canActivate: [authGuard],
    children: [

      {
        path: '',
        component: Supplier
      },

      {
        path: 'add-update-supplier',
        component: AddUpdateSupplier
      }

    ]
  },


  {
    path: 'order',
    component: Order,
    canActivate: [authGuard]
  },


  {
    path: '**',
    redirectTo: 'login'
  }

];