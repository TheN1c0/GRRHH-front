import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class MicuentaService {
  private baseUrl = `${environment.apiUrl}/mi-cuenta/`;

  constructor(private http: HttpClient) {}

  // Obtener los datos del usuario autenticado
  obtenerDatos(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // Actualizar nombre, correo, teléfono, username
  actualizarDatos(datos: {
    nombre: string;
    apellido: string;
    email: string;
    telefono?: string;
    username: string;
    nuevo_email?: string;
    nuevo_telefono?: string;
  }): Observable<any> {
    return this.http.put(this.baseUrl, datos);
  }

  // Enviar correo de verificación
  verificarCorreo(): Observable<any> {
    return this.http.post(`${this.baseUrl}verificar-correo/`, {});
  }

  // Enviar mensaje SMS de verificación
  verificarTelefono(): Observable<any> {
    return this.http.post(`${this.baseUrl}verificar-telefono/`, {});
  }
}
