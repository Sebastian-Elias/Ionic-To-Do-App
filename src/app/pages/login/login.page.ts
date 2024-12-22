import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, FormsModule],  
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.email, this.password)
      .then(() => {
        console.log('Inicio de sesión exitoso');
        this.router.navigate(['/listar-task']);
      })
      .catch(error => {
        alert('Error: ' + error.message);
      });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
  
}