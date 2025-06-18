import { Component } from '@angular/core';
import { SeguridadService } from '../../../services/seguridad.service';
@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.component.html',
  styleUrl: './seguridad.component.scss',
})
export class SeguridadComponent {
  usuarios: any[] = [];
  mostrarFormulario = false;
  esNuevo = true;
  form: any = {};

  constructor(private seguridadService: SeguridadService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.seguridadService.listarUsuarios().subscribe((data) => {
      this.usuarios = data;
    });
  }

  abrirModal() {
    this.esNuevo = true;
    this.form = {};
    this.mostrarFormulario = true;
  }

  editar(usuario: any) {
    this.esNuevo = false;
    this.form = {
      id: usuario.id,
      username: usuario.username,
      email: usuario.email,
      is_superuser: usuario.is_superuser,
      solo_lectura: usuario.permisos?.solo_lectura,
      puede_eliminar: usuario.permisos?.puede_eliminar,
    };
    this.mostrarFormulario = true;
  }

  guardar() {
    console.log('📦 Enviando datos a backend:', this.form);
    console.log('📦 Enviando datos a backend:', this.esNuevo);

    /* if (this.esNuevo) {
      this.seguridadService.crearUsuario(this.form).subscribe(() => {
        this.cargarUsuarios();
        this.cerrarModal();
      });
    } else {
      this.seguridadService
        .actualizarUsuario(this.form.id, this.form)
        .subscribe(() => {
          this.cargarUsuarios();
          this.cerrarModal();
        });
    } */
  }

  eliminar(id: number) {
    if (confirm('¿Seguro que deseas eliminar este usuario?')) {
      this.seguridadService.eliminarUsuario(id).subscribe(() => {
        this.cargarUsuarios();
      });
    }
  }

  cerrarModal() {
    this.mostrarFormulario = false;
    this.form = {};
  }
}
