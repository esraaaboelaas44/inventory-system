import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

// Blocks access to a route if there's no token. Attach to routes in app.routes.ts:
// { path: 'products', component: ProductListComponent, canActivate: [authGuard] }
export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};

// Blocks access based on role. Usage: canActivate: [roleGuard(['admin', 'manager'])]
export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const userJson = localStorage.getItem('user');
    const user = userJson ? JSON.parse(userJson) : null;

    if (!user || !allowedRoles.includes(user.role)) {
      router.navigate(['/dashboard']);
      return false;
    }
    return true;
  };
};
