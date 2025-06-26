import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  UsuarioRRHH,
  PermisosCompletos,
} from '../interfaces/usuario-rrhh.model';
@Injectable({
  providedIn: 'root',
})
export class SeguridadService {
  private apiUrl = `${environment.authUrl}/usuarios-rrhh/`;

  private permisos: PermisosCompletos = {
    puede_crear: false,
    puede_editar: false,
    puede_eliminar: false,
    isSuperuser: false,
  };
  constructor(private http: HttpClient) {}

  //  Almacenar los permisos desde el perfil
  setPermisos(permisos: any): void {
    this.permisos = permisos;
  }

  //  Métodos reutilizables para control de vista
  puedeCrear(): boolean {
    return this.permisos.puede_crear || this.permisos.isSuperuser;
  }

  puedeEditar(): boolean {
    return this.permisos.puede_editar || this.permisos.isSuperuser;
  }

  puedeEliminar(): boolean {
    return this.permisos.puede_eliminar || this.permisos.isSuperuser;
  }
  esSuperusuario(): boolean {
    return this.permisos.isSuperuser;
  }

  //  Métodos HTTP
  listarUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { withCredentials: true }).pipe(
      catchError((error) => {
        console.error('❌ Error al listar usuarios:', error);
        return of([]);
      })
    );
  }

  crearUsuario(usuario: any): Observable<any | null> {
    return this.http
      .post<any>(this.apiUrl, usuario, { withCredentials: true })
      .pipe(
        catchError((error) => {
          console.error('❌ Error al crear usuario:', error);
          return of(null);
        })
      );
  }

  actualizarUsuario(id: number, datos: any): Observable<any | null> {
    return this.http
      .put<any>(`${this.apiUrl}${id}/`, datos, { withCredentials: true })
      .pipe(
        catchError((error) => {
          console.error('❌ Error al actualizar usuario:', error);
          return of(null);
        })
      );
  }

  eliminarUsuario(id: number): Observable<any | null> {
    return this.http
      .delete<any>(`${this.apiUrl}${id}/`, { withCredentials: true })
      .pipe(
        catchError((error) => {
          console.error('❌ Error al eliminar usuario:', error);
          return of(null);
        })
      );
  }
}
