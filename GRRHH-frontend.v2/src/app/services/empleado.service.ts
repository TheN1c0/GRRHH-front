import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Empleado {
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

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  private apiUrl = 'http://localhost:8000/personal/api/empleados/';
  // Cambia esto en producción

  constructor(private http: HttpClient) {}

  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.apiUrl, { withCredentials: true });
  }
  updateEmpleado(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}/`, data, {
      withCredentials: true,
    });
  }

  getCargos(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8000/personal/api/cargos/', {
      withCredentials: true,
    });
  }
  crearEmpleado(empleado: any): Observable<any> {
    return this.http.post(
      'http://localhost:8000/personal/api/empleados/',
      empleado,
      {
        withCredentials: true,
      }
    );
  }
}
