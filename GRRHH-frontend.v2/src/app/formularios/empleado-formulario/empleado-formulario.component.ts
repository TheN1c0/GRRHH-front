import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmpleadoService } from '../../services/empleado.service';
import { PrevisionService } from '../../services/prevision.service';
import { SeguridadService } from '../../services/seguridad.service';
@Component({
  selector: 'app-empleado-formulario',
  templateUrl: './empleado-formulario.component.html',
  styleUrl: './empleado-formulario.component.scss',
})
export class EmpleadoFormularioComponent implements OnChanges {
  @Input() visible: boolean = false;
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardado = new EventEmitter<void>();
  @Input() modo: 'crear' | 'editar' = 'crear';
  @Input() empleadoAEditar: any = null;
  nuevoEmpleado: any = {
    primer_nombre: '',
    otros_nombres: '',
    apellido_paterno: '',
    apellido_materno: '',
    rut: '',
    fecha_nacimiento: '',
    direccion: '',
    telefono: '',
    cargo: null,
    usuario: null,
    prevision: {
      afp: null,
      salud: null,
      seguro_cesantia: null,
    },
  };
  listaAFP: any[] = [];
  listaSalud: any[] = [];
  listaCesantia: any[] = [];
  listaCargos: any[] = [];

  constructor(
    private http: HttpClient,
    private empleadoService: EmpleadoService,
    public seguridadService: SeguridadService,
    private previsionService: PrevisionService
  ) {}

  ngOnInit(): void {
    this.empleadoService.getCargos().subscribe({
      next: (data) => {
        this.listaCargos = data;
      },
      error: (err) => {
        console.error('Error al cargar cargos:', err);
      },
    });

    this.previsionService.getAFP().subscribe((data) => (this.listaAFP = data));
    this.previsionService
      .getSalud()
      .subscribe((data) => (this.listaSalud = data));
    this.previsionService
      .getCesantia()
      .subscribe((data) => (this.listaCesantia = data));

    if (this.modo === 'editar' && this.empleadoAEditar) {
      this.nuevoEmpleado = {
        ...this.empleadoAEditar,
        prevision: {
          afp: this.empleadoAEditar.afp_id || null,
          salud: this.empleadoAEditar.salud_id || null,
          seguro_cesantia: this.empleadoAEditar.cesantia_id || null,
        },
      };
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.modo === 'crear') {
      // Usa el objeto ya definido arriba
      this.nuevoEmpleado = {
        ...this.nuevoEmpleado,
        prevision: {
          afp: null,
          salud: null,
          seguro_cesantia: null,
        },
      };
    }

    if (
      changes['empleadoAEditar'] &&
      this.modo === 'editar' &&
      this.empleadoAEditar
    ) {
      this.nuevoEmpleado = {
        ...this.empleadoAEditar,
        prevision: {
          afp: this.empleadoAEditar.afp_id || null,
          salud: this.empleadoAEditar.salud_id || null,
          seguro_cesantia: this.empleadoAEditar.cesantia_id || null,
        },
      };
    }
  }

  guardar() {
    if (this.modo === 'crear') {
      this.empleadoService.crearEmpleado(this.nuevoEmpleado).subscribe({
        next: () => {
          this.cerrar.emit(); // Cierra modal
          this.guardado.emit(); // Actualiza tabla
        },
        error: (err) => {
          console.error('Error al crear empleado:', err);
        },
      });
    } else if (this.modo === 'editar') {
      this.empleadoService
        .updateEmpleado(this.nuevoEmpleado.id, this.nuevoEmpleado)
        .subscribe({
          next: () => {
            this.cerrar.emit();
            this.guardado.emit();
          },
          error: (err) => {
            console.error('Error al actualizar empleado:', err);
          },
        });
    }

    const prevision = this.nuevoEmpleado.prevision;

    // ✅ Console log agregado aquí
    console.log('Previsión a enviar:', {
      empleado: this.nuevoEmpleado.id,
      afp: prevision?.afp,
      salud: prevision?.salud,
      seguro_cesantia: prevision?.seguro_cesantia,
    });

    this.empleadoService
      .guardarPrevision({
        empleado: this.nuevoEmpleado.id,
        afp: prevision?.afp,
        salud: prevision?.salud,
        seguro_cesantia: prevision?.seguro_cesantia,
      })
      .subscribe({
        next: () => {
          this.cerrar.emit();
          this.guardado.emit();
        },
        error: (err) => {
          console.error('Error al guardar previsión:', err);
        },
      });
  }

  cancelar() {
    this.cerrar.emit();
  }
}
