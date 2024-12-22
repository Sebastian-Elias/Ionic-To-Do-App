import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'listar-task',
    loadComponent: () => import('./pages/listar-task/listar-task.page').then( m => m.ListarTaskPage),
    canActivate: [AuthGuard], // Protege esta ruta con el guardia de autenticación
  },
  {
    path: 'agregar-task',
    loadComponent: () => import('./pages/agregar-task/agregar-task.page').then( m => m.AgregarTaskPage),
    canActivate: [AuthGuard], // Protege esta ruta con el guardia de autenticación
  },
  {
    path: 'editar-task/:id',
    loadComponent: () => import('./pages/editar-task/editar-task.page').then( m => m.EditarTaskPage),
    canActivate: [AuthGuard], // Protege esta ruta con el guardia de autenticación
  },
  {
    path: 'eliminar-task/:id',
    loadComponent: () => import('./pages/eliminar-task/eliminar-task.page').then(m => m.EliminarTaskPage),
    canActivate: [AuthGuard], // Protege esta ruta con el guardia de autenticación
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
];
