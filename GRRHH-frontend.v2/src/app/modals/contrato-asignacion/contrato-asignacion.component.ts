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
  limite = 10;
  offset = 0;
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
    this.contratoService.getEmpleadosSinContrato().subscribe((data) => {
      this.empleadosSinContrato = data;
    });

    this.contratoService.getTipos().subscribe((data) => {
      this.tiposContrato = data;
    });
    this.cargarEmpleados(); // 👈 ahora usas la función paginada

    this.contratoService.getTipos().subscribe((data) => {
      this.tiposContrato = data;
    });
  }
  avanzar() {
    this.offset += this.limite;
    this.cargarEmpleados();
  }

  retroceder() {
    if (this.offset >= this.limite) {
      this.offset -= this.limite;
      this.cargarEmpleados();
    }
  }

  cargarEmpleados() {
    const params = {
      limit: this.limite,
      offset: this.offset,
    };

    this.empleadoService.getEmpleados(params).subscribe((data: any) => {
      this.empleados = data.results || data; // si usas paginación de DRF
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
