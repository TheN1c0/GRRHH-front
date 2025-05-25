import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { EmpleadoService, Empleado } from '../../services/empleado.service';
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
      primer_nombre: [''],
      apellido_paterno: [''],
      apellido_materno: [''],
      correo: [''],
      telefono: [''],
      direccion: [''],
      cargo_postulado: [''],
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
      formData.append(key, this.formulario.value[key]);
    }
    if (this.archivoCV) {
      formData.append('curriculum', this.archivoCV);
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access') || ''}`,
    });
    console.log('Formulario:', this.formulario.value);
    console.log('Archivo:', this.archivoCV);
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
