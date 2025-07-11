import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmpleadoService } from '../../../services/empleado.service';
import { environment } from '../../../../environments/environment';
import { Empleado } from '../../../interfaces/empleado.model';
import { SeguridadService } from '../../../services/seguridad.service';
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
  cargoRelacionado: any = null;
  modoModal: 'comparar' | 'contratar' | null = null;
  constructor(
    private http: HttpClient,
    private empleadoService: EmpleadoService,
    public seguridadService: SeguridadService
  ) {}
  @Output() abrirModal = new EventEmitter<any>();

  abrirContratacion(postulante: any) {
    this.postulanteSeleccionado = postulante;
    this.modoModal = 'contratar';
    this.cargoRelacionado = null;
  }
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

  abrirComparacion(postulante: any) {
    this.postulanteSeleccionado = postulante;
    this.modoModal = 'comparar';

    this.empleadoService.getCargoById(postulante.cargo_postulado).subscribe({
      next: (cargo) => {
        this.cargoRelacionado = cargo;
      },
      error: (err) => {
        console.error('❌ Error al obtener cargo:', err);
        this.cargoRelacionado = null;
        this.modoModal = null;
      },
    });
  }

  cerrarModal() {
    this.postulanteSeleccionado = null;
    this.cargoRelacionado = null;
  }

  compararEtiquetas() {
    const etiquetasCargo =
      this.cargoRelacionado?.palabras_clave_detalle.map((e: any) =>
        e.nombre.toLowerCase()
      ) || [];
    const etiquetasPostulante =
      this.postulanteSeleccionado?.etiquetas.map((e: any) =>
        e.nombre.toLowerCase()
      ) || [];

    return {
      coincidencias: etiquetasCargo.filter((nombre: string) =>
        etiquetasPostulante.includes(nombre)
      ),
      faltantes: etiquetasCargo.filter(
        (nombre: string) => !etiquetasPostulante.includes(nombre)
      ),
      extras: etiquetasPostulante.filter(
        (nombre: string) => !etiquetasCargo.includes(nombre)
      ),
    };
  }
}
