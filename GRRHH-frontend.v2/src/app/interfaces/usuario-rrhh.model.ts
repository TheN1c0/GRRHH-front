export interface PermisosRRHH {
  puede_crear: boolean;
  puede_editar: boolean;
  puede_eliminar: boolean;
}

export interface PermisosCompletos extends PermisosRRHH {
  isSuperuser: boolean;
}

export interface UsuarioRRHH {
  id: number;
  username: string;
  email: string;
  is_superuser: boolean;
  permisos: PermisosRRHH;
}
