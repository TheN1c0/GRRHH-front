import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HorarioService } from '../../services/horario.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { GrupoHorario } from '../../interfaces/grupo-horario.models';
import { Empleado } from '../../interfaces/empleado.model';
import { AbstractControl } from '@angular/forms';

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
  diasSemana = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ];
  horariosEditados: any[] = [];
  constructor(
    private HorarioService: HorarioService,
    private fb: FormBuilder
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
        })
      );
    });
  }

  get horarios(): FormArray {
    return this.formulario.get('horarios') as FormArray;
  }

  guardarCambios(): void {
    const payload = this.formulario.value.horarios;

    this.HorarioService.actualizarHorarios(payload).subscribe({
      next: () => {
        this.cerrar.emit(); // Cierra el modal
      },
      error: (err) => {
        console.error('❌ Error al actualizar horarios:', err);
        alert('❌ Hubo un problema al guardar los cambios.');
      },
    });
  }

  cancelar(): void {
    this.cerrar.emit();
  }
  asFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }
}
