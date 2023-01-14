import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _isLoginIn$ = new BehaviorSubject<boolean>(false)
  isLoginIn$ = this._isLoginIn$.asObservable()

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('Authen')
    this._isLoginIn$.next(!!token)
   }

  login(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/auth/login',data).pipe(
      tap((res: any) => {
        localStorage.setItem('Authen',res.token)
        this._isLoginIn$.next(true)
      })
    )
  }

  isLogin() {
    return localStorage.getItem('Authen')
  }
}
