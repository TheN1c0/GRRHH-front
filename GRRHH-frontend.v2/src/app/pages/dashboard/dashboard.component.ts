import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(private authService: AuthService) {}

  ultimoAcceso: any;

  usuarioActual: string = '';
  accesos: any[] = [];

  ngOnInit() {
    this.authService.getUltimoAcceso().subscribe({
      next: (data) => {
        this.accesos = data;
        this.usuarioActual = localStorage.getItem('usuario') || 'Desconocido';
      },
      error: (err) => {
        console.error('No se pudo obtener accesos', err);
      },
    });
  }
}
