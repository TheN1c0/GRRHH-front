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
  empleadosOriginal: any[] = [];
  @Input() tiposContrato: any[] = [];
  filtroEmpleado: string = '';
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
        this.empleadosOriginal = res.results; // 🆕 guardar sin filtrar
        this.empleados = res.results; // mostrar al inicio
        this.totalEmpleados = res.count;
        this.paginaActual = pagina;
      },
      error: (err) => console.error('Error al cargar empleados:', err),
    });
  }

  getNombreEmpleado(emp: any): string {
    return (
      emp.primer_nombre ||
      emp.apellido_paterno ||
      emp.rut ||
      'Empleado sin nombre'
    );
  }
  filtrarEmpleados(): void {
    const filtro = this.filtroEmpleado.toLowerCase();

    this.empleados = this.empleadosOriginal.filter(
      (emp) =>
        `${emp.primer_nombre} ${emp.apellido_paterno}`
          .toLowerCase()
          .includes(filtro) || emp.rut.toLowerCase().includes(filtro)
    );
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
