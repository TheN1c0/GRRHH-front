import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContratoConfigService } from '../../services/contrato-config.service';

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

  nuevoContrato = {
    empleado: null,
    tipo_contrato: null,
    fecha_inicio: '',
    fecha_fin: '',
    sueldo_base: null,
  };

  constructor(private contratoService: ContratoConfigService) {}

  ngOnInit(): void {
    this.contratoService.getEmpleadosSinContrato().subscribe((data) => {
      this.empleadosSinContrato = data;
    });

    this.contratoService.getTipos().subscribe((data) => {
      this.tiposContrato = data;
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
