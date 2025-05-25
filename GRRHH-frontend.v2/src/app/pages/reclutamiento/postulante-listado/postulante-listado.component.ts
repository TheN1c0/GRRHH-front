import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmpleadoService, Empleado } from '../../../services/empleado.service';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-postulante-listado',
  templateUrl: './postulante-listado.component.html',
  styleUrl: './postulante-listado.component.scss',
})
export class PostulanteListadoComponent implements OnInit {
  postulantes: any[] = [];
  cargos: any[] = [];
  filtroCargo = '';
  filtroEstado = '';
  postulanteSeleccionado: any = null;
  constructor(
    private http: HttpClient,
    private empleadoService: EmpleadoService
  ) {}

  ngOnInit(): void {
    this.obtenerPostulantes();
    this.obtenerCargos();
  }

  verPostulante(p: any) {
    this.postulanteSeleccionado = p;
  }

  obtenerPostulantes() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access') || ''}`,
    });

    this.http
      .get<any[]>(`${environment.apiUrl}/personal/api/postulantes/`, {
        headers,
        withCredentials: true,
      })
      .subscribe({
        next: (data) => {
          this.postulantes = data;
        },
        error: (err) => {
          console.error('❌ Error al obtener postulantes:', err);
        },
      });
  }

  obtenerCargos() {
    this.empleadoService.getCargos().subscribe({
      next: (data) => (this.cargos = data),
      error: (err) => console.error('Error al cargar cargos', err),
    });
  }

  filtrar() {
    return this.postulantes.filter(
      (p) =>
        (this.filtroCargo === '' || p.cargo_postulado === +this.filtroCargo) &&
        (this.filtroEstado === '' || p.estado === this.filtroEstado)
    );
  }

  contratarPostulante(p: any) {
    this.postulanteSeleccionado = p;
  }
}
