export interface Cargo {
  id: number;
  nombre: string;
  departamento: number;
  departamento_nombre?: string;
  superior?: number;
  superior_nombre?: string;
  generar_etiquetas_ia: boolean;
  palabras_clave?: number[];
  palabras_clave_detalle?: {
    id: number;
    nombre: string;
    categoria: string;
  }[];
}
