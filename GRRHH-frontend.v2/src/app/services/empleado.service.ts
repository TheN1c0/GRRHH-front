import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Departamento } from '../interfaces/departamento.model';
import { Cargo } from '../interfaces/cargo.model';
import { Empleado } from '../interfaces/empleado.model';

/* export interface Empleado {
  id: number;
  rut: string;
  fecha_nacimiento: string;
  direccion: string;
  telefono: string;
  nombre_usuario: string;
  nombre_cargo: string;
  nombre_departamento: string;
  primer_nombre: string;
  apellido_paterno: string;
}
 */
@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  // Cambia esto en producción

  constructor(private http: HttpClient) {}

  getEmpleados(params: any = {}): Observable<any> {
    return this.http.get<any>(`${environment.personalUrl}/empleados/`, {
      params,
      withCredentials: true,
    });
  }

  updateEmpleado(id: number, data: any): Observable<any> {
    return this.http.put(`${environment.personalUrl}/empleados/${id}/`, data, {
      withCredentials: true,
    });
  }

  getCargos(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(`${environment.personalUrl}/cargos/`, {
      withCredentials: true,
    });
  }
  crearEmpleado(empleado: any): Observable<any> {
    return this.http.post(`${environment.personalUrl}/empleados/`, empleado, {
      withCredentials: true,
    });
  }

  crearConjuntoContratacion(payload: any): Observable<any> {
    return this.http.post(`${environment.personalUrl}/contratar/`, payload, {
      withCredentials: true,
    });
  }
  // DEPARTAMENTOS
  getDepartamentos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(
      `${environment.personalUrl}/departamentos/`,
      {
        withCredentials: true,
      }
    );
  }

  crearDepartamento(data: any) {
    return this.http.post(`${environment.personalUrl}/departamentos/`, data, {
      withCredentials: true,
    });
  }

  eliminarDepartamento(id: number) {
    return this.http.delete(`${environment.personalUrl}/departamentos/${id}/`, {
      withCredentials: true,
    });
  }

  // CARGOS
  crearCargo(data: any) {
    return this.http.post(`${environment.personalUrl}/cargos/`, data, {
      withCredentials: true,
    });
  }

  eliminarCargo(id: number) {
    return this.http.delete(`${environment.personalUrl}/cargos/${id}/`, {
      withCredentials: true,
    });
  }
  editarDepartamento(id: number, data: any) {
    return this.http.put(
      `${environment.personalUrl}/departamentos/${id}/`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  actualizarCargo(id: number, data: any): Observable<any> {
    return this.http.put(`${environment.personalUrl}/cargos/${id}/`, data, {
      withCredentials: true,
    });
  }
  desvincularEmpleado(id: number): Observable<any> {
    return this.http.post(
      `${environment.personalUrl}/desvincular_empleado/`,
      { id },
      { withCredentials: true }
    );
  }
  cambiarEstadoEmpleado(id: number): Observable<any> {
    return this.http.post(
      `${environment.personalUrl}/cambiar_estado_empleado/`,
      { id },
      { withCredentials: true }
    );
  }
  obtenerPalabrasClave() {
    return this.http.get<any[]>(`${environment.personalUrl}/palabras-clave/`);
  }

  // ✅ Crear una nueva palabra clave (manual)
  crearPalabraClave(nombre: string) {
    return this.http.post<any>(`${environment.personalUrl}/palabras-clave/`, {
      nombre: nombre,
      categoria: 'habilidad', // o permite elegir más adelante
    });
  }
}
