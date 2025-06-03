import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  GrupoHorario,
  Horario,
} from '../../../../interfaces/grupo-horario.models';
import { HorarioService } from '../../../services/horario.service';

@Component({
  selector: 'app-grupos-horario',
  templateUrl: './grupos-horario.component.html',
  styleUrl: './grupos-horario.component.scss',
})
export class GruposHorarioComponent {
  grupoHorarioForm: FormGroup;

  diasSemana: string[] = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ];

  constructor(private fb: FormBuilder, private horarioService: HorarioService) {
    this.grupoHorarioForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      horarios: this.fb.array([]),
    });
  }

  get horarios(): FormArray {
    return this.grupoHorarioForm.get('horarios') as FormArray;
  }

  agregarHorario() {
    this.horarios.push(
      this.fb.group({
        dia_semana: ['', Validators.required],
        hora_entrada: ['', Validators.required],
        hora_salida: ['', Validators.required],
      })
    );
  }

  eliminarHorario(index: number) {
    this.horarios.removeAt(index);
  }

  guardarGrupoHorario() {
    const grupo: GrupoHorario = this.grupoHorarioForm.value;
    this.horarioService.crearGrupo(grupo).subscribe({
      next: (res) => {
        alert('Grupo creado correctamente');
        this.grupoHorarioForm.reset();
        this.horarios.clear();
      },
      error: (err) => {
        console.error('Error al guardar:', err);
      },
    });
  }
}
