import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../../services/empleado.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Departamento } from '../../../interfaces/departamento.model';
import { Cargo } from '../../../interfaces/cargo.model';
import { SeguridadService } from '../../../services/seguridad.service';
@Component({
  selector: 'app-estructura-organizacional',
  templateUrl: './estructura-organizacional.component.html',
  styleUrl: './estructura-organizacional.component.scss',
})
export class EstructuraOrganizacionalComponent implements OnInit {
  departamentos: Departamento[] = [];
  cargos: Cargo[] = [];
  nuevaEtiqueta = '';
  palabrasDisponibles: any[] = [];
  nuevoDepartamento: string = '';
  nuevoCargo: Partial<Cargo> = {
    nombre: '',
    departamento: undefined,
    superior: undefined,
    generar_etiquetas_ia: true,
    palabras_clave: [],
  };
  compararIds(a: number, b: number): boolean {
    return a === b;
  }
  constructor(
    private empleadoService: EmpleadoService,
    public seguridadService: SeguridadService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
    this.cargarPalabrasClave();
  }

  cargarPalabrasClave() {
    this.empleadoService.obtenerPalabrasClave().subscribe((res) => {
      this.palabrasDisponibles = res;
    });
  }
  obtenerNombreEtiqueta(id: number): string {
    const etiqueta = this.palabrasDisponibles.find((p) => p.id === id);
    return etiqueta ? `${etiqueta.nombre} (${etiqueta.categoria})` : `ID ${id}`;
  }
  quitarEtiqueta(id: number) {
    this.nuevoCargo.palabras_clave = this.nuevoCargo.palabras_clave?.filter(
      (e) => e !== id
    );
  }
  toggleEtiqueta(id: number, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.nuevoCargo.palabras_clave ??= [];

    if (checked && !this.nuevoCargo.palabras_clave.includes(id)) {
      this.nuevoCargo.palabras_clave.push(id);
    } else if (!checked) {
      this.nuevoCargo.palabras_clave = this.nuevoCargo.palabras_clave.filter(
        (e) => e !== id
      );
    }
  }
  filtroEtiqueta = '';

  palabrasDisponiblesFiltradas() {
    const filtro = this.filtroEtiqueta.toLowerCase();
    return this.palabrasDisponibles.filter((p) =>
      `${p.nombre} ${p.categoria}`.toLowerCase().includes(filtro)
    );
  }

  agregarEtiqueta() {
    if (this.nuevaEtiqueta.trim()) {
      this.empleadoService
        .crearPalabraClave(this.nuevaEtiqueta)
        .subscribe((nueva) => {
          this.palabrasDisponibles.push(nueva);
          if (!this.nuevoCargo.palabras_clave) {
            this.nuevoCargo.palabras_clave = [];
          }
          this.nuevoCargo.palabras_clave.push(nueva.id);

          this.nuevaEtiqueta = '';
        });
    }
  }

  cargarDatos(): void {
    this.empleadoService
      .getDepartamentos()
      .subscribe((data: Departamento[]) => {
        this.departamentos = data;
      });

    this.empleadoService.getCargos().subscribe((data: Cargo[]) => {
      this.cargos = data;
    });
  }

  agregarDepartamento() {
    if (!this.nuevoDepartamento.trim()) return;
    this.empleadoService
      .crearDepartamento({ nombre: this.nuevoDepartamento })
      .subscribe(() => {
        this.nuevoDepartamento = '';
        this.cargarDatos();
      });
  }

  eliminarDepartamento(id: number) {
    if (confirm('¿Eliminar este departamento?')) {
      this.empleadoService.eliminarDepartamento(id).subscribe({
        next: () => this.cargarDatos(),
        error: (err) => alert(err.error.detail),
      });
    }
  }

  agregarCargo() {
    const { nombre, departamento, superior, generar_etiquetas_ia } =
      this.nuevoCargo;
    if (!nombre || !departamento) return;

    const payload = {
      nombre,
      departamento,
      superior: superior || null,
      generar_etiquetas_ia: !!generar_etiquetas_ia,
      palabras_clave: this.nuevoCargo.generar_etiquetas_ia
        ? []
        : this.nuevoCargo.palabras_clave,
    };

    this.empleadoService.crearCargo(payload).subscribe(() => {
      this.nuevoCargo = {
        nombre: '',
        departamento: undefined,
        superior: undefined,
        generar_etiquetas_ia: true,
      };
      this.cargarDatos();
    });
  }

  eliminarCargo(id: number) {
    if (confirm('¿Eliminar este cargo?')) {
      this.empleadoService.eliminarCargo(id).subscribe({
        next: () => this.cargarDatos(),
        error: (err) => alert(err.error.detail),
      });
    }
  }
  editandoDepartamentoId: number | null = null;
  nombreEditado: string = '';

  activarEdicionDepartamento(departamento: Departamento) {
    this.editandoDepartamentoId = departamento.id;
    this.nombreEditado = departamento.nombre;
  }

  guardarEdicionDepartamento(id: number) {
    const actualizado = { nombre: this.nombreEditado };

    this.empleadoService.editarDepartamento(id, actualizado).subscribe({
      next: () => {
        this.editandoDepartamentoId = null;
        this.cargarDatos();
      },
      error: () => alert('❌ Error al actualizar el departamento'),
    });
  }

  cancelarEdicionDepartamento() {
    this.editandoDepartamentoId = null;
  }

  mensajeError: string = '';
  editandoCargoId: number | null = null;
  cargoEditado: Partial<Cargo> = {};

  // 🟧 Funciones de edición de cargo

  activarEdicionCargo(cargo: Cargo) {
    this.editandoCargoId = cargo.id;
    this.cargoEditado = { ...cargo };
    this.mensajeError = '';
  }

  cancelarEdicionCargo() {
    this.editandoCargoId = null;
    this.cargoEditado = {};
  }

  guardarEdicionCargo() {
    if (
      !this.cargoEditado ||
      !this.cargoEditado.nombre ||
      !this.cargoEditado.departamento
    ) {
      this.mensajeError = 'Por favor, completa todos los campos.';
      return;
    }

    this.empleadoService
      .actualizarCargo(this.editandoCargoId!, this.cargoEditado)
      .subscribe({
        next: () => {
          this.editandoCargoId = null;
          this.cargoEditado = {};
          this.mensajeError = '';
          this.cargarDatos();
        },
        error: (err) => {
          this.mensajeError =
            err.error?.non_field_errors?.[0] ||
            '❌ Error al actualizar el cargo.';
        },
      });
  }
}
