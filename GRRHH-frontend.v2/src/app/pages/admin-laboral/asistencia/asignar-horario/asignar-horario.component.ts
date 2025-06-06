import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HorarioService } from '../../../../services/horario.service';
import { EmpleadoService } from '../../../../services/empleado.service';
import { HorarioEmpleado } from '../../../../interfaces/horario-empleado.model';
import { GrupoHorario } from '../../../../interfaces/grupo-horario.models';
import { Empleado } from '../../../../interfaces/empleado.model';

@Component({
  selector: 'app-asignar-horario',
  templateUrl: './asignar-horario.component.html',
  styleUrl: './asignar-horario.component.scss',
})
export class AsignarHorarioComponent implements OnInit {
  empleados: Empleado[] = [];
  grupos: GrupoHorario[] = [];

  seleccionados: Set<number> = new Set();
  empleadosSeleccionados: Empleado[] = [];

  grupoIdSeleccionado: number | null = null;
  fechaInicio: string = '';
  fechaFin: string = '';

  modalEditarVisible = false;
  modalAsignacionVisible = false;
  grupoSeleccionado: number | null = null;

  constructor(
    private empleadoService: EmpleadoService,
    private horarioService: HorarioService
  ) {}

  ngOnInit(): void {
    this.cargarEmpleados();
    this.cargarGrupos();
  }

  cargarEmpleados(): void {
    this.empleadoService.getEmpleados().subscribe((data) => {
      this.empleados = data;
    });
  }

  cargarGrupos(): void {
    this.horarioService.obtenerGrupos().subscribe((data) => {
      this.grupos = data;
    });
  }

  toggleSeleccion(id: number): void {
    if (this.seleccionados.has(id)) {
      this.seleccionados.delete(id);
    } else {
      this.seleccionados.add(id);
    }
  }

  toggleTodos(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.empleados.forEach((e) => this.seleccionados.add(e.id));
    } else {
      this.seleccionados.clear();
    }
  }

  abrirModalEditar(): void {
    const primero = this.empleados.find((e) => this.seleccionados.has(e.id));
    if (primero?.grupo_id) {
      this.grupoSeleccionado = primero.grupo_id;
      this.empleadosSeleccionados = this.empleados.filter((e) =>
        this.seleccionados.has(e.id)
      );
      this.modalEditarVisible = true;
    } else {
      alert('No se encontró grupo asignado.');
    }
  }

  cerrarModalEditar(): void {
    this.modalEditarVisible = false;
    this.cargarEmpleados();
    this.seleccionados.clear();
  }

  abrirFormularioAsignacion(): void {
    this.modalAsignacionVisible = true;
  }

  eliminarAsignaciones(): void {
    if (!confirm('¿Estás seguro de eliminar las asignaciones seleccionadas?'))
      return;
    // Aquí iría lógica real de eliminación
    alert(`Se eliminarían: ${Array.from(this.seleccionados).join(', ')}`);
    this.seleccionados.clear();
  }

  asignarGrupoAGrupoSeleccionado(): void {
    if (!this.grupoIdSeleccionado || !this.fechaInicio) {
      alert('Debes seleccionar un grupo y fecha de inicio');
      return;
    }

    const empleadosAAsignar = this.empleados.filter((e) =>
      this.seleccionados.has(e.id)
    );

    const payload: HorarioEmpleado[] = empleadosAAsignar.map((e) => ({
      empleado: e.id,
      grupo_horario: this.grupoIdSeleccionado!,
      fecha_inicio: this.fechaInicio,
      fecha_fin: this.fechaFin || undefined,
    }));

    this.horarioService.asignarHorarioEmpleadoBulk(payload).subscribe({
      next: () => {
        alert('✅ Grupo horario asignado exitosamente a los empleados');
        this.cargarEmpleados();
        this.seleccionados.clear();
        this.grupoIdSeleccionado = null;
        this.fechaInicio = '';
        this.fechaFin = '';
        this.modalAsignacionVisible = false;
      },
      error: (err) => {
        console.error('❌ Error al asignar grupo', err);
        alert('Ocurrió un error al asignar el grupo horario.');
      },
    });
  }
}
