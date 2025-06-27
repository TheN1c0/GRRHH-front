import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../interfaces/empleado.model';

@Component({
  selector: 'app-postulante-formulario',
  templateUrl: './postulante-formulario.component.html',
  styleUrl: './postulante-formulario.component.scss',
})
export class PostulanteFormularioComponent implements OnInit {
  formulario: FormGroup;
  archivoCV: File | null = null;
  cargos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private empleadoService: EmpleadoService
  ) {
    this.formulario = this.fb.group({
      primer_nombre: ['', Validators.required],
      apellido_paterno: ['', Validators.required],
      apellido_materno: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      cargo_postulado: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.obtenerCargos();
  }

  seleccionarArchivo(event: any) {
    this.archivoCV = event.target.files[0];
  }

  enviarFormulario() {
    const formData = new FormData();
    for (const key in this.formulario.value) {
      let valor = this.formulario.value[key];

      // Si es fecha, formatear a YYYY-MM-DD
      if (key === 'fecha_nacimiento' && valor instanceof Date) {
        valor = valor.toISOString().split('T')[0];
      }

      formData.append(key, valor);
    }

    if (this.archivoCV) {
      formData.append('curriculum', this.archivoCV);
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access') || ''}`,
    });

    this.http
      .post(`${environment.apiUrl}personal/api/postulantes/`, formData, {
        headers,
        withCredentials: true,
      })
      .subscribe({
        next: () => alert('✔️ Postulación enviada'),
        error: (err) => console.error('❌ Error al enviar:', err),
      });
  }

  obtenerCargos() {
    this.empleadoService.getCargos().subscribe({
      next: (data) => (this.cargos = data),
      error: (err) => console.error('Error al cargar cargos', err),
    });
  }
}
