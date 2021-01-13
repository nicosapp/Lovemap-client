import { HttpAuthTokenInterceptorService } from './http-auth-token-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpHeaderInterceptorService } from './http-header-interceptor.service';
import { HttpLoggingInterceptorService } from './http-logging-interceptor.service';

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpHeaderInterceptorService,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpAuthTokenInterceptorService,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpLoggingInterceptorService,
    multi: true
  }
];
