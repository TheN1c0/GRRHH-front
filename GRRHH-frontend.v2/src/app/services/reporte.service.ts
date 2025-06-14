import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
export interface ReporteMensual {
  mes: number;
  anio: number;
  empleados_pagados: number;
  sueldo_bruto_total: number;
  total_descuentos: number;
  sueldo_liquido_total: number;
  porcentaje_pagado: number;
  ausentismo_laboral: number;
}
@Injectable({
  providedIn: 'root',
})
export class ReporteService {
  constructor(private http: HttpClient) {}

  obtenerReporte(mes: number, anio: number): Observable<ReporteMensual> {
    const params = { mes: mes.toString(), anio: anio.toString() };
    return this.http.get<ReporteMensual>(
      `${environment.personalUrl}/reporte-mensual/`,
      {
        params,
        withCredentials: true,
      }
    );
  }
}
