import { inject } from '@angular/core';
import { CanActivateFn, CanActivateChildFn, Router } from '@angular/router';

import { AuthService } from 'src/app/modules/auth/services/auth.service';

// Check whether user is authenticated
function checkAuthentication(): boolean {
  const authService = inject(AuthService);

  const router = inject(Router);

  // Allow access if user is logged in
  if (authService.isLoggedIn()) {
    return true;
  }

  // Redirect to Login page
  router.navigate(['/auth/login']);

  return false;
}

// Protect Routes
export const authGuard: CanActivateFn = () => {
  return checkAuthentication();
};

// Protect Child Routes
export const authChildGuard: CanActivateChildFn = () => {
  return checkAuthentication();
};
