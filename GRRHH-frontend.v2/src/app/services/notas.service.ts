import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class NotasService {
  constructor(private http: HttpClient) {}

  obtenerNotas(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.authUrl}/api/notas/`, {
      withCredentials: true,
    });
  }

  crearNota(contenido: string): Observable<any> {
    return this.http.post(
      `${environment.authUrl}/api/notas/`,
      { contenido },
      { withCredentials: true }
    );
  }

  editarNota(id: number, contenido: string): Observable<any> {
    return this.http.put(
      `${environment.authUrl}/api/notas/`,
      { id, contenido },
      { withCredentials: true }
    );
  }

  eliminarNota(id: number): Observable<any> {
    return this.http.request('DELETE', `${environment.authUrl}/api/notas/`, {
      body: { id },
      withCredentials: true,
    });
  }
}
