export interface Salud {
  id: number;
  tipo: 'FONASA' | 'ISAPRE';
  nombre?: string | null;
  porcentaje_cotizacion: number;
}
