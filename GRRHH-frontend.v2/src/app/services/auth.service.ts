import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../interfaces/user.model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public usuarioActual: string = '';
  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(usernameOrEmail: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${environment.authUrl}/api/login/`,
      { username: usernameOrEmail, password },
      { withCredentials: true }
    );
  }

  // Método para registrar un nuevo usuario
  register(
    email: string,
    password: string,
    first_name: string
  ): Observable<any> {
    return this.http.post(`${environment.authUrl}/register/`, {
      email,
      password,
      first_name,
    });
  }

  getDashboard(): Observable<any> {
    return this.http.get(`${environment.authUrl}/dashboard/`, {
      withCredentials: true, // <- para que se envíe la cookie HttpOnly
    });
  }
  getUltimoAcceso(): Observable<any> {
    return this.http.get(`${environment.authUrl}/api/ultimo-acceso/`, {
      withCredentials: true,
    });
  }
  verificarSesion(): Observable<any> {
    return this.http.get(`${environment.authUrl}/api/ultimo-acceso/`, {
      withCredentials: true,
    });
  }
}
