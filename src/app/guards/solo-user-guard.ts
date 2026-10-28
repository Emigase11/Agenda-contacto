import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const soloUserGuard: CanActivateFn = (route, state) => {
  //Escribimos la lógica para que devuelva true si dejamos pasar al usuario y false y no queremos que el usuario entre a esta ruta.
  const authService = inject(Auth);
  const router = inject(Router);
  if(authService.token) return true;
  
  const loginPath = router.parseUrl("/login");
  return new RedirectCommand(loginPath, {
    skipLocationChange: false,
  });
};
