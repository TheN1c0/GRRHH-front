import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmpleadoService } from '../../services/empleado.service'; // ajusta la ruta según tu estructura

@Component({
  selector: 'app-empleado-formulario',
  templateUrl: './empleado-formulario.component.html',
  styleUrl: './empleado-formulario.component.scss',
})
export class EmpleadoFormularioComponent {
  @Input() visible: boolean = false;
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardado = new EventEmitter<void>();

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
  }

  guardar() {
    this.empleadoService.crearEmpleado(this.nuevoEmpleado).subscribe({
      next: () => {
        this.guardado.emit();
        this.cerrar.emit();
      },
      error: (err) => {
        console.error('Error al guardar empleado:', err);
      },
    });
  }

  cancelar() {
    this.cerrar.emit();
  }
}
