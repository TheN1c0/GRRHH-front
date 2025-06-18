import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContratoConfigService } from '../../services/contrato-config.service';
import { EmpleadoService } from '../../services/empleado.service';
@Component({
  selector: 'app-contrato-asignacion',
  templateUrl: './contrato-asignacion.component.html',
  styleUrl: './contrato-asignacion.component.scss',
})
export class ContratoAsignacionComponent implements OnInit {
  @Input() visible: boolean = false;
  @Output() cerrado = new EventEmitter<void>();
  @Output() contratoGuardado = new EventEmitter<void>();

  empleadosSinContrato: any[] = [];
  tiposContrato: any[] = [];
  empleados: any[] = [];
  paginaActual = 1;
  limite = 10;

  nuevoContrato = {
    empleado: null,
    tipo_contrato: null,
    fecha_inicio: '',
    fecha_fin: '',
    sueldo_base: null,
  };

  constructor(
    private contratoService: ContratoConfigService,
    private empleadoService: EmpleadoService
  ) {}

  ngOnInit(): void {
    this.contratoService.getTipos().subscribe((data) => {
      this.tiposContrato = data;
    });
    this.cargarEmpleados();

    this.contratoService.getTipos().subscribe((data) => {
      this.tiposContrato = data;
    });
  }

  avanzar() {
    this.cargarEmpleados(this.paginaActual + 1);
  }

  retroceder() {
    if (this.paginaActual > 1) {
      this.cargarEmpleados(this.paginaActual - 1);
    }
  }

  cargarEmpleados(pagina: number = 1): void {
    const params = {
      page: pagina,
      page_size: this.limite,
    };

    this.empleadoService.getEmpleados(params).subscribe({
      next: (res: any) => {
        this.empleados = res.results;
        this.paginaActual = pagina;
      },
      error: (err) => {
        console.error('Error al cargar empleados:', err);
      },
    });
  }

  guardarContrato() {
    this.contratoService.asignarContrato(this.nuevoContrato).subscribe(() => {
      this.contratoGuardado.emit();
      this.cerrar();
    });
  }

  cerrar() {
    this.visible = false;
    this.nuevoContrato = {
      empleado: null,
      tipo_contrato: null,
      fecha_inicio: '',
      fecha_fin: '',
      sueldo_base: null,
    };
    this.cerrado.emit();
  }
}
