import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerPostulantes();
    this.obtenerCargos();
  }

  obtenerPostulantes() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access') || ''}`,
    });

    this.http
      .get<any[]>('/personal/api/postulantes/', { headers })
      .subscribe((data) => {
        this.postulantes = data;
      });
  }

  obtenerCargos() {
    this.http.get<any[]>('/personal/api/cargos/').subscribe((data) => {
      this.cargos = data;
    });
  }

  filtrar() {
    return this.postulantes.filter(
      (p) =>
        (this.filtroCargo === '' || p.cargo_postulado === +this.filtroCargo) &&
        (this.filtroEstado === '' || p.estado === this.filtroEstado)
    );
  }
}
