import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SeguridadService } from '../../services/seguridad.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.scss',
})
export class PortalComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  // Login
  loginEmail: string = '';
  loginPassword: string = '';
  mostrarPassword: boolean = false;

  // Registro
  registerName: string = '';
  registerEmail: string = '';
  registerPassword: string = '';

  constructor(
    private authService: AuthService,
    private seguridadService: SeguridadService,
    private router: Router
  ) {}

  onLogin() {
    this.errorMessage = ''; // Limpiar mensaje anterior
    console.log(this.loginEmail, this.loginPassword);

    this.authService.login(this.loginEmail, this.loginPassword).subscribe({
      next: (response) => {
        console.log('Inicio de sesión exitoso:', response);
        alert('¡Inicio de sesión exitosooo (portal)!');
        localStorage.setItem('usuario', (response as any).username);

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
      },
      error: (error) => {
        console.error('Error en el inicio de sesión:', error);
        this.errorMessage = 'Correo o contraseña incorrectos';
      },
    });
  }

  onRegister() {
    this.errorMessage = ''; // Limpiar mensaje anterior

    this.authService
      .register(this.registerEmail, this.registerPassword, this.registerName)
      .subscribe({
        next: (response) => {
          console.log('Registro exitoso:', response);
          alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
          // puedes limpiar los campos del registro si quieres
        },
        error: (error) => {
          console.error('Error en el registro:', error);
          this.errorMessage = 'Hubo un error al registrarse';
        },
      });
  }
}
