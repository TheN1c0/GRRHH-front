import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class HistorialService {
  constructor(private http: HttpClient) {}

  getHistorial(): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.personalUrl}/historial-cambios/`,
      { withCredentials: true }
    );
  }
}
