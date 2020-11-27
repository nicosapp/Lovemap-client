import { tap } from 'rxjs/operators';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpCachingInterceptorService implements HttpInterceptor {
  constructor(private cache: RequestCache) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // if (!isCacheable(req)) {
    //   return next.handle(req);
    // }

    // const cachedResponse = this.cache.get(req);
    // return cachedResponse
    //   ? of(cachedResponse)
    //   : sendRequest(req, next, this.cache);
    throw new Error('missing implementation');
  }
}

/**
 * Get server response observable by sending request to `next()`.
 * Will add the response to the cache on the way out.
 */
// function sendRequest(
//   req: HttpRequest<any>,
//   next: HttpHandler,
//   cache: RequestCache
// ): Observable<HttpEvent<any>> {
//   // No headers allowed in npm search request
//   const noHeaderReq = req.clone({ headers: new HttpHeaders() });

//   return next.handle(noHeaderReq).pipe(
//     tap((event) => {
//       // There may be other events besides the response.
//       if (event instanceof HttpResponse) {
//         cache.put(req, event); // Update the cache.
//       }
//     })
//   );
// }
