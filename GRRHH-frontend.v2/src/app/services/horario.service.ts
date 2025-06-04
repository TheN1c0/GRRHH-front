import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GrupoHorario } from '../interfaces/grupo-horario.models';
import { Horario } from '../interfaces/horario.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HorarioService {
  private baseUrl = 'http://localhost:8000/personal/api';

  constructor(private http: HttpClient) {}

  // ✅ Obtener todos los horarios
  obtenerHorarios(): Observable<Horario[]> {
    return this.http.get<Horario[]>(`${this.baseUrl}/horarios/`, {
      withCredentials: true,
    });
  }

  // ✅ Crear nuevo horario
  crearHorario(horario: Horario): Observable<Horario> {
    return this.http.post<Horario>(`${this.baseUrl}/horarios/`, horario, {
      withCredentials: true,
    });
  }

  // ✅ Actualizar horario
  actualizarHorario(id: number, horario: Horario): Observable<Horario> {
    return this.http.put<Horario>(`${this.baseUrl}/horarios/${id}/`, horario, {
      withCredentials: true,
    });
  }

  // ✅ Eliminar horario
  eliminarHorario(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/horarios/${id}/`, {
      withCredentials: true,
    });
  }

  // ✅ Obtener grupos de horarios
  obtenerGrupos(): Observable<GrupoHorario[]> {
    return this.http.get<GrupoHorario[]>(`${this.baseUrl}/grupo-horarios/`, {
      withCredentials: true,
    });
  }

  // ✅ Crear grupo horario
  crearGrupoHorario(grupo: GrupoHorario): Observable<GrupoHorario> {
    return this.http.post<GrupoHorario>(
      `${this.baseUrl}/grupo-horarios/`,
      grupo,
      { withCredentials: true }
    );
  }
}
