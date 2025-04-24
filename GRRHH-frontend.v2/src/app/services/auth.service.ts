import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/auth'; // URL base de la API

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(usernameOrEmail: string, password: string) {
    return this.http.post(
      `${this.apiUrl}/api/login/`,
      {
        username: usernameOrEmail,
        password,
      },
      {
        withCredentials: true,
      }
    );
  }

  // Método para registrar un nuevo usuario
  register(
    email: string,
    password: string,
    first_name: string
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/`, {
      email,
      password,
      first_name,
    });
  }

  getDashboard(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard/`, {
      withCredentials: true, // <- para que se envíe la cookie HttpOnly
    });
  }
}
