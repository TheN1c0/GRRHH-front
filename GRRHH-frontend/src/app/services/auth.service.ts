import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/auth'; // URL base de la API

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/`, { email, password });
  }

  // Método para registrar un nuevo usuario
  register(email: string, password: string, name: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/`, { email, password, name });
  }
}
