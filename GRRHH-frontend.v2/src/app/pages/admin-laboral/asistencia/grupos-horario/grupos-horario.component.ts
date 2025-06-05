import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GrupoHorario } from '../../../../interfaces/grupo-horario.models';
import { Horario } from '../../../../interfaces/horario.models';
import { HorarioService } from '../../../../services/horario.service';

@Component({
  selector: 'app-grupos-horario',
  templateUrl: './grupos-horario.component.html',
  styleUrl: './grupos-horario.component.scss',
})
export class GruposHorarioComponent implements OnInit {
  listaHorarios: Horario[] = [];
  todosHorarios: Horario[] = [];
  listaGrupos: GrupoHorario[] = [];

  seleccionados: Set<number> = new Set();

  mostrarFormularioAgrupar = false;
  formGrupo: FormGroup;

  modo: 'individual' | 'grupo' = 'individual';
  agregando = false;
  editandoId: number | null = null;

  nuevoHorario: Partial<Horario> = {
    dia_semana: '',
    hora_entrada: '',
    hora_salida: '',
  };

  diasSemana = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ];

  constructor(private horarioService: HorarioService, private fb: FormBuilder) {
    this.formGrupo = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
    });
  }

  ngOnInit(): void {
    this.cargarHorarios();
    this.cargarGrupos();
  }

  cargarHorarios(): void {
    this.horarioService.obtenerHorarios().subscribe({
      next: (data) => {
        this.listaHorarios = data;
        this.todosHorarios = data;
      },
      error: (err) => console.error('Error al cargar horarios:', err),
    });
  }

  cargarGrupos(): void {
    this.horarioService.obtenerGrupos().subscribe({
      next: (data) => (this.listaGrupos = data),
      error: (err) => console.error('Error al cargar grupos:', err),
    });
  }

  toggleSeleccion(id: number | undefined): void {
    this.seleccionados.has(id!)
      ? this.seleccionados.delete(id!)
      : this.seleccionados.add(id!);
  }

  seleccionarTodos(): void {
    if (this.seleccionados.size === this.listaHorarios.length) {
      this.seleccionados.clear();
    } else {
      this.listaHorarios.forEach((h) => this.seleccionados.add(h.id!));
    }
  }

  // 👉 AGREGAR NUEVO HORARIO
  activarAgregar(): void {
    this.agregando = true;
    this.nuevoHorario = { dia_semana: '', hora_entrada: '', hora_salida: '' };
  }

  cancelarAgregar(): void {
    this.agregando = false;
    this.nuevoHorario = {};
  }

  guardarNuevoHorario(): void {
    if (
      !this.nuevoHorario.dia_semana ||
      !this.nuevoHorario.hora_entrada ||
      !this.nuevoHorario.hora_salida
    )
      return;

    this.horarioService.crearHorario(this.nuevoHorario as Horario).subscribe({
      next: () => {
        this.horarioService.obtenerHorarios().subscribe((horarios) => {
          this.listaHorarios = horarios;
          this.todosHorarios = [...horarios];
          this.cancelarAgregar();
        });
      },
      error: (err) => console.error('Error al crear horario:', err),
    });
  }

  // 👉 EDICIÓN EN LÍNEA
  activarEditar(): void {
    if (this.seleccionados.size === 1) {
      this.editandoId = [...this.seleccionados][0];
    }
  }

  cancelarEditar(): void {
    this.editandoId = null;
    this.cargarHorarios(); // revertir cambios
  }

  guardarEdicion(horario: Horario): void {
    this.horarioService.actualizarHorario(horario.id!, horario).subscribe({
      next: () => {
        this.editandoId = null;
      },
      error: (err) => console.error('Error al guardar cambios:', err),
    });
  }

  // 👉 ELIMINAR
  eliminarSeleccionados(): void {
    const eliminaciones = Array.from(this.seleccionados).map((id) =>
      this.horarioService.eliminarHorario(id)
    );

    Promise.all(eliminaciones.map((obs) => obs.toPromise()))
      .then(() => {
        this.cargarHorarios();
        this.seleccionados.clear();
      })
      .catch((err) => console.error('Error al eliminar:', err));
  }

  // 👉 AGRUPAR
  abrirFormularioAgrupar(): void {
    this.mostrarFormularioAgrupar = true;
  }

  cancelarAgrupacion(): void {
    this.mostrarFormularioAgrupar = false;
    this.formGrupo.reset();
  }

  crearGrupo(): void {
    const grupoData = {
      ...this.formGrupo.value,
      horarios: Array.from(this.seleccionados), // Lista de IDs
    };

    this.horarioService.crearGrupoHorario(grupoData).subscribe({
      next: () => {
        alert('Grupo creado');
        this.cargarGrupos();
        this.cargarHorarios();
        this.seleccionados.clear();
        this.cancelarAgrupacion();
      },
      error: (err) => console.error('Error al crear grupo:', err),
    });
  }

  // 👉 FILTRAR / MOSTRAR
  verTodos(): void {
    this.listaHorarios = this.todosHorarios;
    this.seleccionados.clear();
    this.modo = 'individual';
  }

  filtrarPorGrupo(grupo: GrupoHorario): void {
    this.listaHorarios = this.todosHorarios.filter((h) =>
      grupo.horarios.includes(h.id!)
    );
    this.seleccionados.clear();
    this.modo = 'grupo';
  }
}
