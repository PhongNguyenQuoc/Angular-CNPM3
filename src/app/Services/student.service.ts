import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  api: string = 'http://localhost:3000/api/student'
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(this.api)
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(this.api+ id)
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.api)
  }

  add(data: any): Observable<any> {
    return this.http.post<any>(this.api, data)
  }
}
