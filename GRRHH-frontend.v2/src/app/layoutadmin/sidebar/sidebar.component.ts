import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  adminLaboralOpen: boolean = false;
  ajustesOpen: boolean = false;
  menuActivo: 'adminLaboral' | 'ajustes' | null = null;
  asistenciaOpen: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}
  toggleMenu(menu: 'adminLaboral' | 'ajustes') {
    this.menuActivo = this.menuActivo === menu ? null : menu;

    // Opcional: cerrar asistencia si se cambia de menú
    if (menu !== 'adminLaboral') {
      this.asistenciaOpen = false;
    }
  }
  cerrarSesion() {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/portal']),
      error: () => this.router.navigate(['/portal']),
    });
  }

  toggleAsistencia(event: Event) {
    event.stopPropagation(); // evita cerrar menú padre
    this.asistenciaOpen = !this.asistenciaOpen;
  }

  toggleAdminLaboral() {
    this.menuActivo =
      this.menuActivo === 'adminLaboral' ? null : 'adminLaboral';
  }

  toggleAjustes() {
    this.menuActivo = this.menuActivo === 'ajustes' ? null : 'ajustes';
  }
}
