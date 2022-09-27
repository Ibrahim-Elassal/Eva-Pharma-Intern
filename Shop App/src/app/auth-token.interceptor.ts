import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
 

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  authToken : string | null =  localStorage.getItem("accesstoken") 
  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const newHeaders = {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '{}').token}`,
      // Authorization: `Bearer ${this.authToken}`,
    }

    const modefiedRequest = request.clone({
      headers: new HttpHeaders(newHeaders)
    });
    return next.handle(modefiedRequest);

  }
}
