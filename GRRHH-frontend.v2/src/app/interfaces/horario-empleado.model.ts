export interface HorarioEmpleado {
  id?: number;
  empleado: number;
  grupo_horario: number;
  fecha_inicio: string;
  fecha_fin?: string;
}
