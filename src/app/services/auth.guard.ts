import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Asegúrate de importar el servicio de autenticación

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      // Si está autenticado, lo redirige a la página principal (listar-task)
      this.router.navigate(['/listar-task']);
      return false;
    }
    // Si no está autenticado, permite que continúe en la ruta
    return true;
  }
}
