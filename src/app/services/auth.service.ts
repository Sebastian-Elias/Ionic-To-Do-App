import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

export interface User {
  id?: string; // MockAPI asigna un ID automáticamente
  nombre: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://6764634552b2a7619f5c6ccb.mockapi.io/api/v1/auth';
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    const user = localStorage.getItem('user');
    this.loggedIn.next(!!user); // Se marca como autenticado si hay un usuario en el localStorage
  }

  // Obtener el estado de autenticación
  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  // Registrar un nuevo usuario
  async register(user: User): Promise<void> {
    try {
      if (!user.email || !user.password) {
        throw new Error('Por favor ingresa todos los campos requeridos.');
      }
      await firstValueFrom(this.http.post<User>(this.apiUrl, user));
      this.router.navigate(['/login']); // Redirige al login tras el registro
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      throw error;
    }
  }

  // Iniciar sesión
  async login(email: string, password: string): Promise<void> {
    console.log('AuthService login method called with:', email, password);
  
    try {
      const url = 'https://6764634552b2a7619f5c6ccb.mockapi.io/api/v1/auth';
      const users = await firstValueFrom(this.http.get<User[]>(url));
      console.log('Usuarios obtenidos:', users);
  
      const user = users.find(u => 
        u.email.trim().toLowerCase() === email.trim().toLowerCase() && 
        u.password === password
      );
      
  
      if (user) {
        console.log('Usuario autenticado:', user);
        this.loggedIn.next(true);
        localStorage.setItem('user', JSON.stringify(user));
        console.log('Navegación exitosa a /listar-task');
      } else {
        console.error('Credenciales incorrectas');
        throw new Error('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error en AuthService login:', error);
      throw error;
    }
  }
  
  

  // Cerrar sesión
  logout(): void {
    this.loggedIn.next(false); // Cambia el estado a false
    localStorage.removeItem('user'); // Elimina el usuario del localStorage
    this.router.navigate(['/login']); // Redirige al login
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const user = localStorage.getItem('user');
    return !!user; // Retorna true si hay un usuario almacenado, false de lo contrario
  }
}
