import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class MicuentaService {
  private baseUrl = `${environment.authUrl}/mi-cuenta/`;

  constructor(private http: HttpClient) {}

  obtenerDatos(): Observable<any> {
    return this.http.get(this.baseUrl, { withCredentials: true });
  }

  actualizarDatos(datos: {
    nombre: string;
    apellido: string;
    email: string;
    telefono?: string;
    username: string;
    nuevo_email?: string;
    nuevo_telefono?: string;
  }): Observable<any> {
    return this.http.put(this.baseUrl, datos, { withCredentials: true });
  }

  verificarCorreo(): Observable<any> {
    return this.http.post(
      `${this.baseUrl}verificar-correo/`,
      {},
      { withCredentials: true }
    );
  }

  verificarTelefono(): Observable<any> {
    return this.http.post(
      `${this.baseUrl}verificar-telefono/`,
      {},
      { withCredentials: true }
    );
  }
}
