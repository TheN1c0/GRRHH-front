import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginResponse } from '../../interfaces/user.model';
@Component({
  selector: 'app-portal-de-acceso',
  templateUrl: './portal-de-acceso.component.html',
  styleUrls: ['./portal-de-acceso.component.scss'],
})
export class PortalDeAccesoComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response: LoginResponse) => {
        localStorage.setItem('usuario', (response as any).username);
        console.log('Inicio de sesiónn exitoso:', response);
        alert('¡Inicio de sesión exitoso!');
        console.log('Respuesta completa del login:', response);
        this.authService.usuarioActual = response.username;
        localStorage.setItem('usuario', (response as any).username);
      },
      error: (error) => {
        console.error('Error en el inicio de sesión:', error);
        this.errorMessage = 'Correo o contraseña incorrectos';
      },
    });
  }

  onRegister() {
    this.authService.register(this.email, this.password, this.name).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
      },
      error: (error) => {
        console.error('Error en el registro:', error);
        this.errorMessage = 'Hubo un error al registrarse';
      },
    });
  }
}
