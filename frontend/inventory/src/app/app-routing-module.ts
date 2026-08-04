import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsList } from './features/products/components/products-list/products-list';
import { Login } from './features/auth/components/login/login';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'products', component: ProductsList },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
