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

@Component({
  selector: 'app-editar-horario',
  templateUrl: './editar-horario.component.html',
  styleUrl: './editar-horario.component.scss',
})
export class EditarHorarioComponent implements OnInit {
  @Output() cerrar = new EventEmitter<void>();
  @Input() grupoOriginal!: GrupoHorario;
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

    const formArray = this.formulario.get('horarios') as FormArray;

    this.grupoOriginal.horarios.forEach((h: any) => {
      formArray.push(
        this.fb.group({
          id: [h.id],
          dia: [h.dia],
          hora_entrada: [h.hora_entrada],
          hora_salida: [h.hora_salida],
          es_personalizado: [h.es_personalizado === true],
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
