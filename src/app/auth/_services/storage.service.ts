import { Injectable } from '@angular/core';

const JWT_KEY = 'jwt';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear()
  }

  public saveJwt(user: any): void {
    window.sessionStorage.removeItem(JWT_KEY);
    window.sessionStorage.setItem(JWT_KEY, JSON.stringify(user))
  }

  public getJwt(): any {
    const user = window.sessionStorage.getItem(JWT_KEY)
    if (user) {
      return JSON.parse(user)
    }

    return null
  }
}
