import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(public http: HttpClient) {}
  signUp(email: string, password: string, userName: string): Observable<any> {
    return this.http.post('http://localhost:3000/user/addUser', {
      email: email,
      password: password,
      userName: userName,
    });
  }
}
