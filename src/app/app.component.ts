import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Platform } from '@ionic/angular';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  
  constructor(
    private platform: Platform,
    private authService: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Al cerrar/reiniciar la app, eliminamos el token y cerramos la sesión
      this.platform.resume.subscribe(() => {
        this.authService.logout(); // Cerrar sesión al reanudar la app
      });

      // De esta manera, también escuchamos cuando la app se va a cerrar
      this.platform.pause.subscribe(() => {
        this.authService.logout(); // Cerrar sesión al pausar la app
      });

      // Cerrar sesión al iniciar la app (cuando se reinicia)
      this.authService.logout(); // Borra sesión si existe
    });
  }
}
