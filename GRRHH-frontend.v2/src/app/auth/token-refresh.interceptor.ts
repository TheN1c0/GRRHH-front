import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, switchMap, catchError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TokenRefreshInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private http: HttpClient, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !this.isRefreshing) {
          this.isRefreshing = true;

          return this.http
            .post(
              'http://localhost:8000/auth/api/refresh/',
              {},
              { withCredentials: true }
            )
            .pipe(
              switchMap(() => {
                this.isRefreshing = false;
                return next.handle(req);
              }),
              catchError((refreshError) => {
                this.isRefreshing = false;
                this.router.navigate(['/portal']);
                return throwError(() => refreshError);
              })
            );
        }
        return throwError(() => error);
      })
    );
  }
}
