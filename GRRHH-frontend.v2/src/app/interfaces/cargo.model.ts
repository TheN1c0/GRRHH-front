export interface Cargo {
  id: number;
  nombre: string;
  departamento: number;
  departamento_nombre?: string;
  superior?: number;
  superior_nombre?: string;
}
