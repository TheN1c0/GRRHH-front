export interface Horario {
  dia_semana: string;
  hora_entrada: string; // formato HH:mm
  hora_salida: string;
}

export interface GrupoHorario {
  nombre: string;
  descripcion?: string;
  horarios: Horario[];
}
