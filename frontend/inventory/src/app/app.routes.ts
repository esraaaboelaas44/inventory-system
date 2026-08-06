import { Routes } from '@angular/router';

import { ProductsList } from './features/products/components/products-list/products-list';
import { LoginComponent } from './features/auth/components/login/login';
import { ForgotPasswordComponent } from './features/auth/components/forgot-password/forgot-password';
import { ResetPasswordComponent } from './features/auth/components/reset-password/reset-password';

import { AddUpdateSupplier } from './features/supplier/add-update-supplier/add-update-supplier';
import { Supplier } from './features/supplier/supplier';
import { Order } from './features/order/order';

import { authGuard } from './guards/auth.guard';

import { Users } from './features/auth/components/users/users';
import { UserForm } from './features/auth/components/user-form/user-form';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },

  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent
  },

  {
    path: 'users',
    component: Users,
    canActivate: [authGuard]
  },

  {
    path: 'users/add',
    component: UserForm,
    canActivate: [authGuard]
  },

  {
    path: 'users/edit/:id',
    component: UserForm,
    canActivate: [authGuard]
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