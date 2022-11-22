import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable }                                                              from '@angular/core';
import { Observable, throwError }                                                  from 'rxjs';
import { catchError }                                                              from 'rxjs/operators';
import { JwtState }                                                                from 'src/app/auth/login/state/login'
import { StorageService }                                                          from '../_services/storage.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let jwt = this.storageService.getJwt()?.token
    if (!!jwt) {
      req = req.clone({
        headers: req.headers.append('Authorization', `Bearer ${jwt}`)
        .append('Role', `ADMIN`)
      })
    }
    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status === 401) JwtState.actReLogin.emit()
        return throwError(() => error)
      })
    )
  }
}

export const httpInterceptorProviders = [
  {
    provide : HTTP_INTERCEPTORS,
    useClass: HttpRequestInterceptor,
    multi   : true
  }
];
