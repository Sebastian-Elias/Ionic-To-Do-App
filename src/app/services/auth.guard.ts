import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Asegúrate de importar el servicio de autenticación

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      // Si no está autenticado, redirige al login
      this.router.navigate(['/login']);
      return false;
    }
    // Si está autenticado, permite el acceso a la ruta
    return true;
  }
  
}
