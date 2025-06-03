import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GrupoHorario } from '../interfaces/grupo-horario.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HorarioService {
  private baseUrl = 'http://localhost:8000/api/grupo-horarios/';

  constructor(private http: HttpClient) {}

  // Obtener todos los grupos
  obtenerGrupos(): Observable<GrupoHorario[]> {
    return this.http.get<GrupoHorario[]>(this.baseUrl);
  }

  // Obtener un grupo específico por ID
  obtenerGrupo(id: number): Observable<GrupoHorario> {
    return this.http.get<GrupoHorario>(`${this.baseUrl}${id}/`);
  }

  // Crear un grupo nuevo
  crearGrupo(grupo: GrupoHorario): Observable<GrupoHorario> {
    return this.http.post<GrupoHorario>(this.baseUrl, grupo);
  }

  // Actualizar un grupo existente
  actualizarGrupo(id: number, grupo: GrupoHorario): Observable<GrupoHorario> {
    return this.http.put<GrupoHorario>(`${this.baseUrl}${id}/`, grupo);
  }

  // Eliminar un grupo
  eliminarGrupo(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${id}/`);
  }
}
