import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ContratoConfigService {

  private reglasUrl = `${environment.apiUrl}personal/reglas-contrato/`;
  private tiposUrl = `${environment.apiUrl}personal/tipo-contrato/`;

  constructor(private http: HttpClient) {}

  // 🔹 ReglasContrato
  getReglas() {
    return this.http.get(this.reglasUrl, { withCredentials: true });
  }

  crearRegla(data: any) {
    return this.http.post(this.reglasUrl, data, { withCredentials: true });
  }

  eliminarRegla(id: number) {
    return this.http.delete(`${this.reglasUrl}${id}/`, { withCredentials: true });
  }

  // 🔹 TipoContrato
  getTipos() {
    return this.http.get(this.tiposUrl, { withCredentials: true });
  }

  crearTipo(data: any) {
    return this.http.post(this.tiposUrl, data, { withCredentials: true });
  }

  eliminarTipo(id: number) {
    return this.http.delete(`${this.tiposUrl}${id}/`, { withCredentials: true });
  }
}
