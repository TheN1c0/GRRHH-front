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
    return this.http.get<any>(`${environment.apiUrl}personal/api/empleados/`, {
      params,
      withCredentials: true,
    });
  }

  updateEmpleado(id: number, data: any): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}personal/api/empleados/${id}/`,
      data,
      { withCredentials: true }
    );
  }

  /*   getCargos(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8000/personal/api/cargos/', {
      withCredentials: true,
    });
  } */

  getCargos(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(
      `${environment.apiUrl}/personal/api/cargos/`,
      {
        withCredentials: true,
      }
    );
  }
  crearEmpleado(empleado: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}personal/api/empleados/`,
      empleado,
      { withCredentials: true }
    );
  }

  crearConjuntoContratacion(payload: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}personal/api/contratar/`,
      payload,
      {
        withCredentials: true,
      }
    );
  }
  // DEPARTAMENTOS
  getDepartamentos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(
      `${environment.apiUrl}/personal/api/departamentos/`,
      {
        withCredentials: true,
      }
    );
  }

  crearDepartamento(data: any) {
    return this.http.post(
      `${environment.apiUrl}/personal/api/departamentos/`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  eliminarDepartamento(id: number) {
    return this.http.delete(
      `${environment.apiUrl}/personal/api/departamentos/${id}/`,
      {
        withCredentials: true,
      }
    );
  }

  // CARGOS
  crearCargo(data: any) {
    return this.http.post(`${environment.apiUrl}/personal/api/cargos/`, data, {
      withCredentials: true,
    });
  }

  eliminarCargo(id: number) {
    return this.http.delete(
      `${environment.apiUrl}/personal/api/cargos/${id}/`,
      {
        withCredentials: true,
      }
    );
  }
  editarDepartamento(id: number, data: any) {
    return this.http.put(
      `${environment.apiUrl}/personal/api/departamentos/${id}/`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  actualizarCargo(id: number, data: any): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}personal/api/cargos/${id}/`,
      data,
      {
        withCredentials: true,
      }
    );
  }
  desvincularEmpleado(id: number): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}personal/api/desvincular_empleado/`,
      { id },
      { withCredentials: true }
    );
  }
  cambiarEstadoEmpleado(id: number): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}personal/api/cambiar_estado_empleado/`,
      { id },
      { withCredentials: true }
    );
  }
}
