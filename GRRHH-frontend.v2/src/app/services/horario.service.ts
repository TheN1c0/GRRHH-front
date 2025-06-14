import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GrupoHorario } from '../interfaces/grupo-horario.models';
import { Horario } from '../interfaces/horario.models';
import { HorarioEmpleado } from '../interfaces/horario-empleado.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HorarioService {
  constructor(private http: HttpClient) {}

  // ✅ Obtener todos los horarios
  obtenerHorarios(): Observable<Horario[]> {
    return this.http.get<Horario[]>(`${environment.personalUrl}/horarios/`, {
      withCredentials: true,
    });
  }

  // ✅ Crear nuevo horario
  crearHorario(horario: Horario): Observable<Horario> {
    return this.http.post<Horario>(
      `${environment.personalUrl}/horarios/`,
      horario,
      {
        withCredentials: true,
      }
    );
  }

  // ✅ Actualizar horario
  actualizarHorario(id: number, horario: Horario): Observable<Horario> {
    return this.http.put<Horario>(
      `${environment.personalUrl}/horarios/${id}/`,
      horario,
      {
        withCredentials: true,
      }
    );
  }

  // ✅ Eliminar horario
  eliminarHorario(id: number): Observable<any> {
    return this.http.delete(`${environment.personalUrl}/horarios/${id}/`, {
      withCredentials: true,
    });
  }

  // ✅ Obtener grupos de horarios
  obtenerGrupos(): Observable<GrupoHorario[]> {
    return this.http.get<GrupoHorario[]>(
      `${environment.personalUrl}/grupo-horarios/`,
      {
        withCredentials: true,
      }
    );
  }

  // ✅ Crear grupo horario
  // Solo esta función cambia
  crearGrupoHorario(grupo: {
    nombre: string;
    descripcion?: string;
    horarios: number[];
  }) {
    return this.http.post<GrupoHorario>(
      `${environment.personalUrl}/grupo-horarios/`,
      grupo,
      {
        withCredentials: true,
      }
    );
  }
  asignarHorarioEmpleado(data: HorarioEmpleado): Observable<HorarioEmpleado> {
    return this.http.post<HorarioEmpleado>(
      `${environment.personalUrl}/horario-empleado/`,
      data,
      {
        withCredentials: true,
      }
    );
  }
  actualizarHorarioPersonalizado(id: number, data: any) {
    return this.http.put(`/api/horario_empleado/${id}/`, data);
  }

  crearHorarioPersonalizado(data: any) {
    return this.http.post(`/api/horario_empleado/`, data);
  }
  obtenerGrupo(id: number): Observable<GrupoHorario> {
    return this.http.get<GrupoHorario>(
      `${environment.personalUrl}/grupo-horarios/${id}/`,
      { withCredentials: true }
    );
  }

  actualizarHorarios(horarios: Horario[]): Observable<any> {
    return this.http.put(
      `${environment.personalUrl}/horarios/bulk/`,
      horarios,
      {
        withCredentials: true,
      }
    );
  }
  actualizarHorariosEmpleado(data: HorarioEmpleado[]): Observable<any> {
    return this.http.put(
      `${environment.personalUrl}/horario-empleado/editar-multiples/`,
      data,
      {
        withCredentials: true,
      }
    );
  }
  eliminarHorariosEmpleado(id: number): Observable<any> {
    return this.http.delete(
      `${environment.personalUrl}/horario-empleado/${id}/`,
      {
        withCredentials: true,
      }
    );
  }

  asignarHorarioEmpleadoBulk(data: HorarioEmpleado[]): Observable<any> {
    return this.http.post(
      `${environment.personalUrl}/asignacion-horaria-masiva/`,
      data,
      {
        withCredentials: true,
      }
    );
  }
  obtenerHorariosEmpleado(empleadoId: number): Observable<Horario[]> {
    return this.http.get<Horario[]>(
      `${environment.personalUrl}/horarios-empleado/${empleadoId}/`,
      { withCredentials: true }
    );
  }
  eliminarHorariosEmpleadoMultiples(empleados: number[]): Observable<any> {
    console.log('🧹 Enviando empleados seleccionados al backend:', empleados);
    return this.http.post(
      `${environment.personalUrl}/horario-empleado-eliminar-multiples/`,
      { empleados },
      { withCredentials: true }
    );
  }
}
