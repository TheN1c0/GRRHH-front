import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrevisionService } from '../../services/prevision.service';
import { EmpleadoService } from 'app/services/empleado.service';
import { AFP } from '../../interfaces/afp.model';
import { Salud } from '../../interfaces/salud.model';
import { Cesantia } from '../../interfaces/cesantia.model';
import { ContratoConfigService } from 'app/services/contrato-config.service';

@Component({
  selector: 'app-postulante-contratar',
  templateUrl: './postulante-contratar.component.html',
  styleUrl: './postulante-contratar.component.scss',
})
export class PostulanteContratarComponent implements OnInit {
  @Input() postulante: any;
  afps: AFP[] = [];
  saludOpciones: Salud[] = [];
  cesantias: Cesantia[] = [];
  cargos: any[] = [];
  tiposContrato: any[] = [];
  @Output() cerrar = new EventEmitter<void>();

  formulario!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private previsionService: PrevisionService,
    private empleadoService: EmpleadoService,
    private contratoConfigService: ContratoConfigService
  ) {}

  ngOnInit(): void {
    this.empleadoService.getCargos().subscribe({
      next: (data) => (this.cargos = data),
      error: (err) => console.error('Error al cargar cargos', err),
    });
    // Cargar datos previsionales
    this.previsionService
      .getAFP()
      .subscribe((data: any[]) => (this.afps = data));
    this.contratoConfigService.getTipos().subscribe({
      next: (data: any) => (this.tiposContrato = data),
      error: (err) => console.error('Error al cargar tipos de contrato', err),
    });

    this.previsionService
      .getSalud()
      .subscribe((data) => (this.saludOpciones = data));
    this.previsionService
      .getCesantia()
      .subscribe((data) => (this.cesantias = data));
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

  contratar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const form = this.formulario.value;

    const payload = {
      empleado: {
        rut: form.rut,
        primer_nombre: form.primer_nombre,
        otros_nombres: form.otros_nombres,
        apellido_paterno: form.apellido_paterno,
        apellido_materno: form.apellido_materno,
        fecha_nacimiento: this.postulante.fecha_nacimiento,
        correo: form.correo,
        telefono: form.telefono,
        direccion: form.direccion,
        cargo: form.cargo_postulado,
        empleador: 1, // por ahora fijo, si tienes uno predeterminado
      },
      contrato: {
        tipo_contrato: form.tipo_contrato,
        fecha_inicio: form.fecha_inicio,
        fecha_fin: form.fecha_fin,
        sueldo_base: form.sueldo_base,
      },
      prevision: {
        afp: form.afp,
        salud: form.salud,
        seguro_cesantia: form.seguro_cesantia,
      },
    };

    this.empleadoService.crearConjuntoContratacion(payload).subscribe({
      next: () => alert('✅ Empleado contratado con éxito'),
      error: (err) => console.error('❌ Error al contratar:', err),
    });
  }
}
