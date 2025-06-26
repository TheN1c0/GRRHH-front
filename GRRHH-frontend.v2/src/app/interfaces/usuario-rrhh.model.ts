export interface PermisosRRHH {
  puede_crear: boolean;
  puede_editar: boolean;
  puede_eliminar: boolean;
}

export interface UsuarioRRHH {
  id: number;
  username: string;
  email: string;
  is_superuser: boolean;
  permisos: {
    puede_crear: boolean;
    puede_editar: boolean;
    puede_eliminar: boolean;
  };
}
