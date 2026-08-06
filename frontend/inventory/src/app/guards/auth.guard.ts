import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../core/services/auths.service';


export const authGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  console.log('TOKEN IN GUARD:', token);


  if (authService.isLoggedIn()) {
    console.log('ACCESS GRANTED');
    return true;
  }

  console.log('NO TOKEN - REDIRECT');

  router.navigate(['/login']);

  return false;
};