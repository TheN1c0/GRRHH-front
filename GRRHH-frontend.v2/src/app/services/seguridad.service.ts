import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class SeguridadService {
  private apiUrl = `${environment.authUrl}/usuarios-rrhh/`;

  constructor(private http: HttpClient) {}

  listarUsuarios() {
    return this.http.get<any[]>(this.apiUrl, {
      withCredentials: true,
    });
  }

  crearUsuario(usuario: any) {
    return this.http.post(this.apiUrl, usuario, {
      withCredentials: true,
    });
  }

  actualizarUsuario(id: number, datos: any) {
    return this.http.put(`${this.apiUrl}${id}/`, datos, {
      withCredentials: true,
    });
  }

  eliminarUsuario(id: number) {
    return this.http.delete(`${this.apiUrl}${id}/`, {
      withCredentials: true,
    });
  }
}
