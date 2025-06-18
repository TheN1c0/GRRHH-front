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

  empleados: any[] = [];
  tiposContrato: any[] = [];
  paginaActual = 1;
  tamanoPagina = 5;
  totalEmpleados = 0;

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
    this.cargarEmpleados();

    this.contratoService.getTipos().subscribe((data) => {
      this.tiposContrato = data;
    });
  }

  cargarEmpleados(pagina: number = 1): void {
    const params = {
      page: pagina,
      page_size: this.tamanoPagina,
    };

    this.empleadoService.getEmpleados(params).subscribe({
      next: (res: any) => {
        this.empleados = res.results;
        this.totalEmpleados = res.count;
        this.paginaActual = pagina;
      },
      error: (err) => console.error('Error al cargar empleados:', err),
    });
  }

  totalPaginasArray(): number[] {
    const totalPaginas = Math.ceil(this.totalEmpleados / this.tamanoPagina);
    return Array.from({ length: totalPaginas }, (_, i) => i + 1);
  }

  guardarContrato(): void {
    this.contratoService.asignarContrato(this.nuevoContrato).subscribe(() => {
      this.contratoGuardado.emit();
      this.cerrar();
    });
  }

  cerrar(): void {
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
