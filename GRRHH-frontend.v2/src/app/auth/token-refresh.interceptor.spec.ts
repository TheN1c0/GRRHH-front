import { TestBed } from '@angular/core/testing';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { TokenRefreshInterceptor } from './token-refresh.interceptor';
import { Router } from '@angular/router';

describe('TokenRefreshInterceptor', () => {
  let interceptor: TokenRefreshInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TokenRefreshInterceptor,
        { provide: HttpClient, useValue: {} },
        { provide: Router, useValue: { navigate: () => {} } },
      ],
    });

    interceptor = TestBed.inject(TokenRefreshInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
