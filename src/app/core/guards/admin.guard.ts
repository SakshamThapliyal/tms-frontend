import { inject } from '@angular/core';

import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';


export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/auth/login']);

    return false;
  }

  if (!authService.isAdmin()) {
    router.navigate(['/dashboard']);

    return false;
  }

  return true;
};
