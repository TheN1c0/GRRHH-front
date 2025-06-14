import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HorarioService } from '../../../../services/horario.service';
import { EmpleadoService } from '../../../../services/empleado.service';
import { HorarioEmpleado } from '../../../../interfaces/horario-empleado.model';
import { GrupoHorario } from '../../../../interfaces/grupo-horario.models';
import { Empleado } from '../../../../interfaces/empleado.model';
import { Horario } from '../../../../interfaces/horario.models';
import { GrupoHorarioExpandido } from '../../../../interfaces/grupoHorarioExpandido.models';
@Component({
  selector: 'app-asignar-horario',
  templateUrl: './asignar-horario.component.html',
  styleUrl: './asignar-horario.component.scss',
})
export class AsignarHorarioComponent implements OnInit {
  empleados: Empleado[] = [];
  grupos: GrupoHorario[] = [];
  todosHorarios: Horario[] = [];
  seleccionados: Set<number> = new Set();
  empleadosSeleccionados: Empleado[] = [];

  grupoIdSeleccionado: number | null = null;
  fechaInicio: string = '';
  fechaFin: string = '';

  modalEditarVisible = false;
  modalAsignacionVisible = false;
  grupoSeleccionado: GrupoHorario | null = null;
  grupoSeleccionadoExpandido: GrupoHorarioExpandido | null = null;
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
      this.empleados = data.results;
    });
  }

  cargarGrupos(): void {
    this.horarioService.obtenerGrupos().subscribe((data) => {
      console.log('📦 Grupos recibidos:', data);
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
      this.horarioService.obtenerGrupo(primero.grupo_id).subscribe((grupo) => {
        console.log('✅ Grupo base:', grupo);

        // Obtener todos los horarios si no están cargados aún
        if (!this.todosHorarios.length) {
          this.horarioService.obtenerHorarios().subscribe((todos) => {
            this.todosHorarios = todos;

            this.aplicarHorariosAlGrupo(grupo, todos);
          });
        } else {
          this.aplicarHorariosAlGrupo(grupo, this.todosHorarios);
        }
      });
    } else {
      alert('No se encontró grupo asignado.');
    }
  }

  aplicarHorariosAlGrupo(grupo: GrupoHorario, todos: Horario[]): void {
    const horariosDelGrupo = todos.filter((h) =>
      grupo.horarios.includes(h.id!)
    );

    // 1️⃣ Este objeto es solo para el modal (con horarios completos)
    this.grupoSeleccionadoExpandido = {
      ...grupo,
      horarios: horariosDelGrupo,
    };

    // 2️⃣ Este objeto puede mantener los IDs si se necesita para otra lógica
    this.grupoSeleccionado = {
      ...grupo,
      horarios: grupo.horarios,
    };

    this.empleadosSeleccionados = this.empleados.filter((e) =>
      this.seleccionados.has(e.id)
    );

    this.modalEditarVisible = true;
  }

  cerrarModalEditar(): void {
    this.modalEditarVisible = false;
    this.cargarEmpleados();
    this.seleccionados.clear();
  }

  eliminarAsignaciones(): void {
    const empleadosIds = Array.from(this.seleccionados);

    if (empleadosIds.length === 0) {
      alert('⚠️ No hay empleados seleccionados.');
      return;
    }

    if (
      !confirm(
        '¿Eliminar todas las asignaciones de los empleados seleccionados?'
      )
    )
      return;

    this.horarioService
      .eliminarHorariosEmpleadoMultiples(empleadosIds)
      .subscribe({
        next: (res) => {
          alert(res.mensaje);
          this.seleccionados.clear();
          this.cargarEmpleados(); // Vuelve a cargar la tabla
        },
        error: (err) => {
          console.error('❌ Error al eliminar:', err);
          alert('Error al eliminar las asignaciones.');
        },
      });
  }

  asignarGrupoAGrupoSeleccionado(evento: {
    grupoId: number;
    fecha_inicio: string;
    fecha_fin?: string;
  }) {
    const { grupoId, fecha_inicio, fecha_fin } = evento;

    const empleadosAAsignar = this.empleados.filter((e) =>
      this.seleccionados.has(e.id)
    );

    const payload: HorarioEmpleado[] = empleadosAAsignar.map((e) => ({
      empleado: e.id,
      grupo_horario: grupoId,
      fecha_inicio,
      fecha_fin,
    }));

    // 🧪 Log para revisar qué se envía al backend
    console.table(payload);

    this.horarioService.asignarHorarioEmpleadoBulk(payload).subscribe({
      next: () => {
        alert('✅ Grupo horario asignado exitosamente a los empleados');
        this.cargarEmpleados();
        this.seleccionados.clear();
        this.modalAsignacionVisible = false;
      },
      error: (err) => {
        console.error('❌ Error al asignar grupo', err);
        alert('Ocurrió un error al asignar el grupo horario.');
      },
    });
  }

  cerrarModalAsignacion(): void {
    this.modalAsignacionVisible = false;
  }

  abrirFormularioAsignacion(): void {
    if (this.seleccionados.size === 0) {
      alert('Debes seleccionar al menos un empleado.');
      return;
    }

    this.modalAsignacionVisible = true;
  }
}
