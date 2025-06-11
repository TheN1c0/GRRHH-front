import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { NotasService } from '../../services/notas.service';
import { HistorialService } from '../../services/historial.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private notasService: NotasService,
    private historialService: HistorialService
  ) {}
  //-------------Historial-----------------------
  historial: any[] = [];
  //-------------Notas-----------------------
  notas: any[] = [];
  nuevaNota: string = '';
  modoEdicion: boolean = false;
  notaEditandoId: number | null = null;

  //-------------acceso_usuario----------------
  ultimoAcceso: any;
  usuarioActual: string = '';
  accesos: any[] = [];

  ngOnInit() {
    this.cargarNotas();
    this.authService.getUltimoAcceso().subscribe({
      next: (data) => {
        this.accesos = data;
        this.usuarioActual = localStorage.getItem('usuario') || 'Desconocido';
      },
      error: (err) => {
        console.error('No se pudo obtener accesos', err);
      },
    });
    this.historialService.getHistorial().subscribe({
      next: (data) => (this.historial = data),
      error: (err) => console.error('Error al obtener historial', err),
    });
  }

  //----------------------------------Notas--------------------------------------------
  cargarNotas() {
    this.notasService.obtenerNotas().subscribe((res) => (this.notas = res));
  }

  guardarNota() {
    if (this.modoEdicion && this.notaEditandoId !== null) {
      this.notasService
        .editarNota(this.notaEditandoId, this.nuevaNota)
        .subscribe(() => {
          this.reiniciar();
          this.cargarNotas();
        });
    } else {
      this.notasService.crearNota(this.nuevaNota).subscribe(() => {
        this.reiniciar();
        this.cargarNotas();
      });
    }
  }

  editarNota(nota: any) {
    this.nuevaNota = nota.contenido;
    this.modoEdicion = true;
    this.notaEditandoId = nota.id;
  }

  eliminarNota(id: number) {
    this.notasService.eliminarNota(id).subscribe(() => this.cargarNotas());
  }

  reiniciar() {
    this.nuevaNota = '';
    this.modoEdicion = false;
    this.notaEditandoId = null;
  }
  //----------------------------------Notas-Fin--------------------------------------------
}
