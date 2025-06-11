export interface Empleado {
  id: number;
  primer_nombre: string;
  otros_nombres?: string;
  apellido_paterno: string;
  apellido_materno: string;
  rut: string;
  fecha_nacimiento: string; // ISO format: 'YYYY-MM-DD'
  direccion: string;
  telefono: string;
  cargo: number | null; // ID del cargo
  empleador: number | null; // ID del empleador
  creado_por: number | null; // ID del usuario creador
  grupo_id?: number; // <- Agrega esto
  grupo_nombre?: string; // <- Y esto
  es_personalizado?: boolean; // <- También esto si lo usas en la vista
  fecha_inicio?: string;
  fecha_fin?: string;
  nombre_cargo?: string;
  horario_empleado_id?: number;
}
