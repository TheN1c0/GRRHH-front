import { Component } from '@angular/core';
import { SeguridadService } from '../../../services/seguridad.service';
import { UsuarioRRHH } from '../../../interfaces/usuario-rrhh.model';
@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.component.html',
  styleUrl: './seguridad.component.scss',
})
export class SeguridadComponent {
  usuarios: UsuarioRRHH[] = [];
  mostrarFormulario = false;
  esNuevo = true;

  form: Partial<UsuarioRRHH & { password?: string }> = {};

  constructor(public seguridadService: SeguridadService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.seguridadService.listarUsuarios().subscribe((data) => {
      this.usuarios = data;
    });
  }

  abrirModal(): void {
    this.esNuevo = true;
    this.form = {};
    this.mostrarFormulario = true;
  }

  editar(usuario: UsuarioRRHH): void {
    this.esNuevo = false;
    this.form = {
      id: usuario.id,
      username: usuario.username,
      email: usuario.email,
      is_superuser: usuario.is_superuser,
      permisos: {
        puede_crear: usuario.permisos?.puede_crear ?? false,
        puede_editar: usuario.permisos?.puede_editar ?? false,
        puede_eliminar: usuario.permisos?.puede_eliminar ?? false,
      },
    };
    this.mostrarFormulario = true;
  }

  guardar(): void {
    const data = { ...this.form };

    if (this.esNuevo) {
      this.seguridadService.crearUsuario(data).subscribe(() => {
        this.cargarUsuarios();
        this.cerrarModal();
      });
    } else if (this.form.id) {
      this.seguridadService
        .actualizarUsuario(this.form.id, data)
        .subscribe(() => {
          this.cargarUsuarios();
          this.cerrarModal();
        });
    }
  }

  eliminar(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este usuario?')) {
      this.seguridadService.eliminarUsuario(id).subscribe(() => {
        this.cargarUsuarios();
      });
    }
  }

  cerrarModal(): void {
    this.mostrarFormulario = false;
    this.form = {};
  }
}
