import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class SeguridadService {
  private apiUrl = `${environment.authUrl}/usuarios-rrhh/`;

  constructor(private http: HttpClient) {}

  //  Listar usuarios
  listarUsuarios(): Observable<any[]> {
    return this.http
      .get<any[]>(this.apiUrl, {
        withCredentials: true,
      })
      .pipe(
        catchError((error) => {
          console.error('❌ Error al listar usuarios:', error);
          return of([]); // Devuelve array vacío si hay error
        })
      );
  }

  //  Crear usuario
  crearUsuario(usuario: any): Observable<any | null> {
    return this.http
      .post<any>(this.apiUrl, usuario, {
        withCredentials: true,
      })
      .pipe(
        catchError((error) => {
          console.error('❌ Error al crear usuario:', error);
          return of(null);
        })
      );
  }

  //  Actualizar usuario
  actualizarUsuario(id: number, datos: any): Observable<any | null> {
    return this.http
      .put<any>(`${this.apiUrl}${id}/`, datos, {
        withCredentials: true,
      })
      .pipe(
        catchError((error) => {
          console.error('❌ Error al actualizar usuario:', error);
          return of(null);
        })
      );
  }

  //  Eliminar usuario
  eliminarUsuario(id: number): Observable<any | null> {
    return this.http
      .delete<any>(`${this.apiUrl}${id}/`, {
        withCredentials: true,
      })
      .pipe(
        catchError((error) => {
          console.error('❌ Error al eliminar usuario:', error);
          return of(null);
        })
      );
  }
}
