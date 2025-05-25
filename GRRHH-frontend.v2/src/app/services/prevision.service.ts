import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PrevisionService {
  constructor(private http: HttpClient) {}
  getAfps(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/personal/api/afps/`, {
      withCredentials: true,
    });
  }

  getSalud(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/personal/api/salud/`, {
      withCredentials: true,
    });
  }

  getSegurosCesantia(): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.apiUrl}/personal/api/seguros-cesantia/`,
      {
        withCredentials: true,
      }
    );
  }
}
