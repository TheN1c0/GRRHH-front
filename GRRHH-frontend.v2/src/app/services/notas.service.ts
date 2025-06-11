import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotasService {
  private apiUrl = 'http://localhost:8000/auth/api/notas/';

  constructor(private http: HttpClient) {}

  obtenerNotas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { withCredentials: true });
  }

  crearNota(contenido: string): Observable<any> {
    return this.http.post(
      this.apiUrl,
      { contenido },
      { withCredentials: true }
    );
  }

  editarNota(id: number, contenido: string): Observable<any> {
    return this.http.put(
      this.apiUrl,
      { id, contenido },
      { withCredentials: true }
    );
  }

  eliminarNota(id: number): Observable<any> {
    return this.http.request('DELETE', this.apiUrl, {
      body: { id },
      withCredentials: true,
    });
  }
}
