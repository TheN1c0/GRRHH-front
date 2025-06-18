import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-verificar-email',
  templateUrl: './verificar-email.component.html',
  styleUrl: './verificar-email.component.scss',
})
export class VerificarEmailComponent implements OnInit {
  mensaje = '';
  estado = ''; // 'exito', 'error', 'cargando'

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (!token) {
      this.mensaje = '❌ Token no válido o faltante.';
      this.estado = 'error';
      return;
    }

    this.estado = 'cargando';

    this.http
      .get(`${environment.authUrl}/mi-cuenta/verificar-email/?token=${token}`, {
        withCredentials: true,
      })
      .subscribe({
        next: (res: any) => {
          this.mensaje = res.detail || '✅ Correo verificado correctamente.';
          this.estado = 'exito';
        },
        error: (err) => {
          this.mensaje =
            err.error?.detail || '❌ No se pudo verificar el correo.';
          this.estado = 'error';
        },
      });
  }
}
