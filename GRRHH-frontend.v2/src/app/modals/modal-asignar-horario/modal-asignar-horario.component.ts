import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GrupoHorario } from '../../interfaces/grupo-horario.models';

@Component({
  selector: 'app-modal-asignar-horario',
  templateUrl: './modal-asignar-horario.component.html',
  styleUrl: './modal-asignar-horario.component.scss',
})
export class ModalAsignarHorarioComponent {
  @Input() grupos: GrupoHorario[] = [];
  @Output() asignar = new EventEmitter<{
    grupoId: number;
    fecha_inicio: string;
    fecha_fin?: string;
  }>();
  @Output() cancelar = new EventEmitter<void>();
  @Input() grupoOriginal!: GrupoHorario;
  formulario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      grupo_horario: [null, Validators.required],
      fecha_inicio: [null, Validators.required],
      fecha_fin: [null],
    });
  }
  ngOnChanges(): void {}
  submit(): void {
    if (this.formulario.invalid) return;

    const { grupo_horario, fecha_inicio, fecha_fin } = this.formulario.value;
    this.asignar.emit({ grupoId: grupo_horario, fecha_inicio, fecha_fin });
  }

  cerrar(): void {
    this.cancelar.emit();
  }
  asignarHorario(): void {
    if (!this.grupoOriginal?.id) {
      alert('⚠️ El grupo no es válido o no está definido.');
      return;
    }

    const grupoId = this.grupoOriginal.id;

    const { fecha_inicio, fecha_fin } = this.formulario.value;

    this.asignar.emit({
      grupoId,
      fecha_inicio,
      fecha_fin: fecha_fin || undefined,
    });
  }
}
