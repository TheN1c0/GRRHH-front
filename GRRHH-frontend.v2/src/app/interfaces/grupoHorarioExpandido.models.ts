import { GrupoHorario } from './grupo-horario.models';
import { Horario } from './horario.models';

export interface GrupoHorarioExpandido extends Omit<GrupoHorario, 'horarios'> {
  horarios: Horario[];
}
