import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SeguridadService } from '../../services/seguridad.service';
@Component({
  selector: 'app-layoutadmin',
  templateUrl: './layoutadmin.component.html',
  styleUrl: './layoutadmin.component.scss',
})
export class LayoutadminComponent implements OnInit {
  sidebarVisible: boolean = true;

  constructor(
    private authService: AuthService,
    private seguridadService: SeguridadService
  ) {}

  ngOnInit(): void {
    this.authService.obtenerPermisosActuales().subscribe({
      next: (usuario) => {
        this.seguridadService.setPermisos(usuario.permisos || {});
      },
      error: (err) => {
        console.warn(
          '❌ No se pudieron recuperar los permisos al iniciar LayoutAdmin:',
          err
        );
      },
    });
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
