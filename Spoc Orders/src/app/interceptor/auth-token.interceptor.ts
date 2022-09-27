import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  private authToken : string | null =  localStorage.getItem("accesstoken")  ;
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const newHeaders = {
      ApiKey: `${this.authToken}`,
    }
    const modefiedRequest = request.clone({
      headers: new HttpHeaders(newHeaders),
    });
    return next.handle(modefiedRequest).pipe(
      catchError((err: HttpErrorResponse) => {
          if(err.status=== 401){
            alert("Unauthorization Error")
          }
          return throwError(err);
      })
  );
}}