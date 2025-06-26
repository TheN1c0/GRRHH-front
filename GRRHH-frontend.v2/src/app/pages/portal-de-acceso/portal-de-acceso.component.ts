import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SeguridadService } from '../../services/seguridad.service';
import { Router } from '@angular/router';
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

  constructor(
    private authService: AuthService,
    private seguridadService: SeguridadService,
    private router: Router
  ) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('usuario', (response as any).username);
        console.log('Inicio de sesiónn exitoso:', response);
        alert('¡Inicio de sesión exitoso! (portal-de-acceso)');
        console.log('Respuesta completa del login:', response);
        // Obtener el perfil del usuario logueado
        this.authService.obtenerPermisosActuales().subscribe({
          next: (usuario) => {
            console.log('👤 Perfil obtenido:', usuario);
            this.seguridadService.setPermisos(usuario.permisos || {});
            this.router.navigate(['/dashboard']);
          },
          error: (err) => {
            console.error('❌ Error al obtener el perfil:', err);
            this.errorMessage = 'No se pudo cargar el perfil del usuario';
          },
        });
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
