import {
  HttpInterceptorFn,
  HttpHandlerFn,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, switchMap, throwError, of } from 'rxjs';

export const tokenRefreshInterceptor: HttpInterceptorFn = (
  req,
  next: HttpHandlerFn
) => {
  const http = inject(HttpClient);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Intentamos refrescar token
        return http
          .post('/auth/api/refresh/', {}, { withCredentials: true })
          .pipe(
            switchMap(() => {
              // Reintentamos la petición original
              return next(req);
            }),
            catchError(() => {
              // Si falla, redirigimos a login
              router.navigate(['/login']);
              return throwError(() => error);
            })
          );
      }

      return throwError(() => error);
    })
  );
};
