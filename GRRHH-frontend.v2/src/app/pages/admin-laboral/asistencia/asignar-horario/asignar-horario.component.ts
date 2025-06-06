import { Component, OnInit } from '@angular/core';
import { EmpleadoService, Empleado } from '../../../../services/empleado.service';
import { HorarioService } from '../../../../services/horario.service';
import { GrupoHorario } from '../../../../interfaces/grupo-horario.models';

@Component({
  selector: 'app-asignar-horario',
  templateUrl: './asignar-horario.component.html',
  styleUrl: './asignar-horario.component.scss'
})
export class AsignarHorarioComponent implements OnInit {
  empleados: Empleado[] = [];
  grupos: GrupoHorario[] = [];
  editandoId: number | null = null;
  grupoSeleccionado: GrupoHorario | null = null;

  constructor(
    private empleadoService: EmpleadoService,
    private horarioService: HorarioService
  ) {}

  ngOnInit(): void {
    this.cargarEmpleados();
    this.horarioService.obtenerGrupos().subscribe({
      next: (data) => (this.grupos = data),
      error: (err) => console.error('Error al cargar grupos:', err),
    });
  }

  cargarEmpleados(): void {
    this.empleadoService.getEmpleados().subscribe({
      next: (data) => (this.empleados = data),
      error: (err) => console.error('Error al cargar empleados:', err),
    });
  }

  iniciarEdicion(emp: Empleado): void {
    this.editandoId = emp.id;
    this.grupoSeleccionado =
      this.grupos.find((g) => g.id === (emp as any).grupo_horario) || null;
  }

  cancelarEdicion(): void {
    this.editandoId = null;
    this.grupoSeleccionado = null;
    this.cargarEmpleados();
  }

  guardarEdicion(emp: Empleado): void {
    const payload = {
      grupo_horario: this.grupoSeleccionado ? this.grupoSeleccionado.id : null,
    };
    this.empleadoService.updateEmpleado(emp.id, payload).subscribe({
      next: () => {
        this.editandoId = null;
        this.cargarEmpleados();
      },
      error: (err) => console.error('Error al asignar horario:', err),
    });
  }
}
