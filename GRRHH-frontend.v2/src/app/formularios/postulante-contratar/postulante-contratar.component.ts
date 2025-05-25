import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrevisionService } from '../../services/prevision.service';

@Component({
  selector: 'app-postulante-contratar',
  templateUrl: './postulante-contratar.component.html',
  styleUrl: './postulante-contratar.component.scss',
})
export class PostulanteContratarComponent implements OnInit {
  @Input() postulante: any;
  formulario!: FormGroup;
  afps: any[] = [];
  saludOpciones: any[] = [];
  segurosCesantia: any[] = [];

  constructor(
    private fb: FormBuilder,
    private previsionService: PrevisionService
  ) {}

  ngOnInit(): void {
    this.previsionService.getAfps().subscribe((data) => (this.afps = data));
    this.previsionService
      .getSalud()
      .subscribe((data) => (this.saludOpciones = data));
    this.previsionService
      .getSegurosCesantia()
      .subscribe((data) => (this.segurosCesantia = data));
    this.formulario = this.fb.group({
      rut: [''],
      primer_nombre: [''],
      otros_nombres: [''],
      apellido_paterno: [''],
      apellido_materno: [''],
      direccion: [''],
      correo: [''],
      telefono: [''],
      cargo_postulado: [''],

      // Campos nuevos que completará RRHH
      tipo_contrato: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      fecha_fin: [''],
      sueldo_base: [0, [Validators.required, Validators.min(200000)]],
      afp: ['', Validators.required],
      salud: ['', Validators.required],
      seguro_cesantia: ['', Validators.required],
    });

    if (this.postulante) {
      this.formulario.patchValue({
        rut: this.postulante.rut,
        primer_nombre: this.postulante.primer_nombre,
        otros_nombres: this.postulante.otros_nombres,
        apellido_paterno: this.postulante.apellido_paterno,
        apellido_materno: this.postulante.apellido_materno,
        direccion: this.postulante.direccion,
        correo: this.postulante.correo,
        telefono: this.postulante.telefono,
        cargo_postulado: this.postulante.cargo_postulado?.id,
      });
    }
  }
}
