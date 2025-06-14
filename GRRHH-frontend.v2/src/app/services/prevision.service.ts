import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AFP } from '../interfaces/afp.model';
import { Salud } from '../interfaces/salud.model';
import { Cesantia } from '../interfaces/cesantia.model';
@Injectable({
  providedIn: 'root',
})
export class PrevisionService {
  constructor(private http: HttpClient) {}

  // AFP
  getAFP(): Observable<AFP[]> {
    return this.http.get<AFP[]>(`${environment.personalUrl}/afp/`, {
      withCredentials: true,
    });
  }

  crearAFP(data: any) {
    return this.http.post(`${environment.personalUrl}/afp/`, data, {
      withCredentials: true,
    });
  }

  eliminarAFP(id: number) {
    return this.http.delete(`${environment.personalUrl}/afp/${id}/`, {
      withCredentials: true,
    });
  }

  // SALUD
  getSalud(): Observable<Salud[]> {
    return this.http.get<Salud[]>(`${environment.personalUrl}/salud/`, {
      withCredentials: true,
    });
  }

  crearSalud(data: any) {
    return this.http.post(`${environment.personalUrl}/salud/`, data, {
      withCredentials: true,
    });
  }

  eliminarSalud(id: number) {
    return this.http.delete(`${environment.personalUrl}/salud/${id}/`, {
      withCredentials: true,
    });
  }

  // CESANTÍA
  getCesantia(): Observable<Cesantia[]> {
    return this.http.get<Cesantia[]>(`${environment.personalUrl}/cesantia/`, {
      withCredentials: true,
    });
  }

  crearCesantia(data: any) {
    return this.http.post(`${environment.personalUrl}/cesantia/`, data, {
      withCredentials: true,
    });
  }

  eliminarCesantia(id: number) {
    return this.http.delete(`${environment.personalUrl}/cesantia/${id}/`, {
      withCredentials: true,
    });
  }
}
