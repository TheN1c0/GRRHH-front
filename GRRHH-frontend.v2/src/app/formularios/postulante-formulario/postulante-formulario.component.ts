import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-postulante-formulario',
  templateUrl: './postulante-formulario.component.html',
  styleUrl: './postulante-formulario.component.scss',
})
export class PostulanteFormularioComponent implements OnInit {
  formulario: FormGroup;
  archivoCV: File | null = null;
  cargos: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.formulario = this.fb.group({
      primer_nombre: [''],
      apellido_paterno: [''],
      apellido_materno: [''],
      email: [''],
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

    this.http
      .post('/personal/api/postulantes/', formData, { headers })
      .subscribe({
        next: () => alert('✔️ Postulación enviada'),
        error: (err) => console.error('❌ Error al enviar:', err),
      });
  }

  obtenerCargos() {
    this.http.get<any[]>('/personal/api/cargos/').subscribe({
      next: (data) => (this.cargos = data),
    });
  }
}
