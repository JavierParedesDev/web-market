import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  async onLogin(): Promise<void> {
    try {
      await this.authService.login(this.email, this.password);
      // Redirigir a otra página si es necesario
    } catch (error) {
      // Manejar el error de login
      alert('Error de inicio de sesión. Inténtalo de nuevo.');
    }
  }
}
