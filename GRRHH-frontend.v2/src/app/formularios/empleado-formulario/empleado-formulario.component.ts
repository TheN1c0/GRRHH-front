import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmpleadoService } from '../../services/empleado.service'; // ajusta la ruta según tu estructura

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
  };

  listaCargos: any[] = [];

  constructor(
    private http: HttpClient,
    private empleadoService: EmpleadoService
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
    if (this.modo === 'editar' && this.empleadoAEditar) {
      this.nuevoEmpleado = { ...this.empleadoAEditar };
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('Modo:', this.modo);
    console.log('Empleado recibido:', this.empleadoAEditar);
    if (this.modo === 'crear') {
      // Reinicia los campos
      this.nuevoEmpleado = {
        nombre: '',
        cargo: '',
        area: '',
        telefono: '',
        rut: '',
        estado: 'activo',
      };
    }
    if (
      changes['empleadoAEditar'] &&
      this.modo === 'editar' &&
      this.empleadoAEditar
    ) {
      console.log('Empleado recibido:', this.empleadoAEditar);
      this.nuevoEmpleado = { ...this.empleadoAEditar }; // Copia los datos al modelo del formulario
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
          // Aquí podrías mostrar un error al usuario
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
  }

  cancelar() {
    this.cerrar.emit();
  }
}
