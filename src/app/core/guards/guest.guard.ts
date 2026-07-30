import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from 'src/app/modules/auth/services/auth.service';

// Check whether user is already logged in
export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  const router = inject(Router);

  // Redirect logged-in users to Dashboard
  if (authService.isLoggedIn()) {
    router.navigate(['/dashboard']);

    return false;
  }

  // Allow guest users
  return true;
};
