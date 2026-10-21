import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const soloPublicGuard: CanActivateFn = (route, state) => {
  //Devuelvo true si no hay token (soy usuario público)
  const authService = inject(Auth);
  const router = inject(Router);
  if(!authService.token) return true;

  const loginPath = router.parseUrl("/contacts");
  return new RedirectCommand(loginPath, {
    skipLocationChange: false,
  });
};
