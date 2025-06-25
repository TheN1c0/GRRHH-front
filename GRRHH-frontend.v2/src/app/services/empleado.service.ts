import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Departamento } from '../interfaces/departamento.model';
import { Cargo } from '../interfaces/cargo.model';
import { Empleado } from '../interfaces/empleado.model';
import { delay, tap, take, finalize, switchMap } from 'rxjs/operators';
import { PalabraClave } from '../interfaces/palabraclave.model';
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
  getCargoById(id: number): Observable<Cargo> {
    return this.http.get<Cargo>(`${environment.personalUrl}/cargos/${id}/`, {
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
  obtenerPalabrasClave(): Observable<PalabraClave[]> {
    // Inicia conteo regresivo de 5 a 1
    interval(1000)
      .pipe(
        take(5),
        tap((seg) => console.log(`⌛ Esperando: ${5 - seg} segundos...`)),
        finalize(() =>
          console.log('🚀 Ejecutando solicitud de palabras clave...')
        )
      )
      .subscribe();

    // Retarda la solicitud real 5 segundos
    return this.http
      .get<PalabraClave[]>(`${environment.personalUrl}/palabras-clave/`, {
        withCredentials: true,
      })
      .pipe(delay(5000));
  }

  // ✅ Crear una nueva palabra clave (manual)
  crearPalabraClave(nombre: string): Observable<PalabraClave> {
    return this.http.post<PalabraClave>(
      `${environment.personalUrl}/palabras-clave/`,
      {
        nombre: nombre,
        categoria: 'habilidad',
      },
      { withCredentials: true }
    );
  }
}
