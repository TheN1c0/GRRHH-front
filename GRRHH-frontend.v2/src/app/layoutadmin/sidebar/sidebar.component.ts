import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  adminLaboralOpen: boolean = false;
  ajustesOpen: boolean = false;
  toggleAdminLaboral() {
    this.adminLaboralOpen = !this.adminLaboralOpen;
  }
  asistenciaOpen = false;
  toggleAsistencia() {
    this.asistenciaOpen = !this.asistenciaOpen;
  }

  toggleAjustes() {
    this.ajustesOpen = !this.ajustesOpen;
  }
}
