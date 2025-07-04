import { Component } from '@angular/core';
import { PrevisionService } from '../../../services/prevision.service';
import { SeguridadService } from '../../../services/seguridad.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-prevision',
  templateUrl: './prevision.component.html',
  styleUrl: './prevision.component.scss',
})
export class PrevisionComponent {
  listaAFP: any[] = [];
  listaSalud: any[] = [];
  listaCesantia: any[] = [];
  afp = { nombre: '', porcentaje_cotizacion: null };
  salud = { tipo: null, nombre: '', porcentaje: null };
  cesantia = {
    nombre: '',
    porcentaje_trabajador: null,
    porcentaje_empleador: null,
  };
  constructor(
    private previsionService: PrevisionService,
    public seguridadService: SeguridadService
  ) {}
  @ViewChild('formSalud') formSalud!: NgForm;
  @ViewChild('formCesantia') formCesantia!: NgForm;

  ngAfterViewInit() {
    // Esperar un poco para que Angular evalúe los formularios
    setTimeout(() => {
      console.log('🩺 Formulario Salud - válido:', !this.formSalud.invalid);
      console.log(
        '💼 Formulario Cesantía - válido:',
        !this.formCesantia.invalid
      );

      console.log('Detalles formSalud:', this.formSalud);
      console.log('Detalles formCesantia:', this.formCesantia);
    }, 500);
  }

  ngOnInit(): void {
    console.log(
      'seguridadService.puedeCrear() =>',
      this.seguridadService.puedeCrear()
    );
    this.cargarTodo();
  }
  cargarTodo() {
    this.previsionService
      .getAFP()
      .subscribe((res: any) => (this.listaAFP = res));
    this.previsionService
      .getSalud()
      .subscribe((res: any) => (this.listaSalud = res));
    this.previsionService
      .getCesantia()
      .subscribe((res: any) => (this.listaCesantia = res));
  }
  bloquearComa(event: KeyboardEvent) {
    if (event.key === ',') {
      event.preventDefault();
    }
  }

  agregarAFP() {
    this.previsionService.crearAFP(this.afp).subscribe(() => {
      this.afp = { nombre: '', porcentaje_cotizacion: null };
      this.cargarTodo();
    });
  }

  agregarSalud() {
    this.previsionService.crearSalud(this.salud).subscribe(() => {
      this.salud = { tipo: null, nombre: '', porcentaje: null };
      this.cargarTodo();
    });
  }
  agregarCesantia() {
    console.log('Se ejecutó agregarCesantia'); // Agregado
    this.previsionService.crearCesantia(this.cesantia).subscribe(() => {
      this.cesantia = {
        nombre: '',
        porcentaje_trabajador: null,
        porcentaje_empleador: null,
      };
      this.cargarTodo();
    });
  }

  eliminarAFP(id: number) {
    if (confirm('¿Seguro que deseas eliminar esta AFP?')) {
      this.previsionService.eliminarAFP(id).subscribe(() => this.cargarTodo());
    }
  }

  eliminarSalud(id: number) {
    if (confirm('¿Seguro que deseas eliminar esta institución de salud?')) {
      this.previsionService
        .eliminarSalud(id)
        .subscribe(() => this.cargarTodo());
    }
  }

  eliminarCesantia(id: number) {
    if (confirm('¿Seguro que deseas eliminar este seguro de cesantía?')) {
      this.previsionService
        .eliminarCesantia(id)
        .subscribe(() => this.cargarTodo());
    }
  }
}
