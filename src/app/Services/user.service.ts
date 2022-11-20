import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/user')
  }
  
  getById(id: number): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/user/' + id)
  }

  // add(data: any): Observable<any> {
  //   return this.http.post<any>('http://localhost:3000/api/user')
  // }
}
