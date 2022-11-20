import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/subject')
  }

  getById(id: any): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/subject/',id)
  }

  update(id: any): Observable<any> {
    return this.http.put<any>('http://localhost:3000/api/subject/',id)
  }
}