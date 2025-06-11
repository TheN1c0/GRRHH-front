import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HorarioService } from '../../services/horario.service';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { GrupoHorario } from '../../interfaces/grupo-horario.models';
import { Empleado } from '../../interfaces/empleado.model';
import { GrupoHorarioExpandido } from '../../interfaces/grupoHorarioExpandido.models';
@Component({
  selector: 'app-editar-horario',
  templateUrl: './editar-horario.component.html',
  styleUrl: './editar-horario.component.scss',
})
export class EditarHorarioComponent implements OnInit {
  @Output() cerrar = new EventEmitter<void>();
  @Input() grupoOriginal!: GrupoHorarioExpandido;
  @Input() empleadosSeleccionados: Empleado[] = [];
  formulario!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private HorarioService: HorarioService
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      horarios: this.fb.array([]),
    });

    // Caso 1: No hay empleados seleccionados (no debería ocurrir normalmente)
    if (!this.empleadosSeleccionados?.length) {
      this.cargarHorariosBase();
      return;
    }

    // Caso 2: Solo un empleado seleccionado - cargamos sus horarios personalizados
    if (this.empleadosSeleccionados.length === 1) {
      const empleado = this.empleadosSeleccionados[0];
      this.cargarHorariosPersonalizados(empleado.id);
      return;
    }

    // Caso 3: Múltiples empleados seleccionados - cargamos horarios base del grupo
    this.cargarHorariosBase();
  }

  private cargarHorariosBase(): void {
    const formArray = this.formulario.get('horarios') as FormArray;
    formArray.clear();

    this.grupoOriginal.horarios.forEach((h: any) => {
      formArray.push(
        this.fb.group({
          id: [h.id],
          dia: [h.dia_semana],
          hora_entrada: [h.hora_entrada],
          hora_salida: [h.hora_salida],
          es_personalizado: [false], // Todos son horarios base
        })
      );
    });
  }

  private cargarHorariosPersonalizados(empleadoId: number): void {
    this.HorarioService.obtenerHorariosEmpleado(empleadoId).subscribe({
      next: (personalizados) => {
        this.combinarHorariosConBase(personalizados);
      },
      error: (err) => {
        console.error('❌ Error cargando horarios personalizados:', err);
        // Si falla, cargamos los horarios base como fallback
        this.cargarHorariosBase();
      },
    });
  }

  private combinarHorariosConBase(personalizados: any[]): void {
    const formArray = this.formulario.get('horarios') as FormArray;
    formArray.clear();

    this.grupoOriginal.horarios.forEach((hBase: any) => {
      const horarioPersonalizado = personalizados.find(
        (p) => p.dia_semana === hBase.dia_semana
      );

      formArray.push(
        this.fb.group({
          id: [horarioPersonalizado?.id || hBase.id],
          dia: [hBase.dia_semana],
          hora_entrada: [
            horarioPersonalizado?.hora_entrada || hBase.hora_entrada,
          ],
          hora_salida: [horarioPersonalizado?.hora_salida || hBase.hora_salida],
          es_personalizado: [!!horarioPersonalizado],
        })
      );
    });
  }

  get horarios(): FormArray {
    return this.formulario.get('horarios') as FormArray;
  }

  asFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  guardarCambios(): void {
    const horarios = this.formulario.value.horarios;

    if (!this.empleadosSeleccionados.length) {
      alert('⚠️ Debes seleccionar al menos un empleado.');
      return;
    }

    for (const h of horarios) {
      if (!h.hora_entrada || !h.hora_salida) {
        alert(`⛔ Horario incompleto en ${h.dia}`);
        return;
      }
      if (h.hora_entrada >= h.hora_salida) {
        alert(`⛔ Entrada no puede ser igual o mayor que salida en ${h.dia}`);
        return;
      }

      const data = {
        dia: h.dia,
        hora_entrada: h.hora_entrada,
        hora_salida: h.hora_salida,
      };

      if (h.es_personalizado) {
        this.HorarioService.actualizarHorarioPersonalizado(
          h.id,
          data
        ).subscribe({
          next: () => console.log(`✅ Actualizado ${h.dia}`),
          error: (err) => console.error(`❌ Error actualizando ${h.dia}`, err),
        });
      } else {
        this.empleadosSeleccionados.forEach((emp) => {
          const payload = {
            ...data,
            empleado_id: emp.id,
            grupo_horario_id: this.grupoOriginal.id,
            fecha_inicio: new Date().toISOString().slice(0, 10),
            es_personalizado: true,
          };
          this.HorarioService.crearHorarioPersonalizado(payload).subscribe({
            next: () => console.log(`🆕 Creado para ${emp.id} (${h.dia})`),
            error: (err) => console.error(`❌ Error creando`, err),
          });
        });
      }
    }

    setTimeout(() => this.cerrar.emit(), 500);
  }

  cancelar(): void {
    this.cerrar.emit();
  }
}
