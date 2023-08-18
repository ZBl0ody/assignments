import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(public http: HttpClient) {}
  signUp(email: string, password: string, userName: string): Observable<any> {
    return this.http.post('http://localhost:3000/user/signup', {
      email: email,
      password: password,
      userName: userName,
    });
  }
  login(email: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3000/user/login', {
      email: email,
      password: password,
    });
  }
}
