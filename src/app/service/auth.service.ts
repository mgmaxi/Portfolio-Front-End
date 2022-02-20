import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginUser } from './../security/models/login-user';
import { SignupUser } from '../security/models/signup-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authURL = 'http://localhost:8080/api/auth/';

  constructor(private httpClient: HttpClient) {}

  public signup(signupUser: SignupUser): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'signup', signupUser);
  }

  public login(loginUser: LoginUser): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'login', loginUser);
  }
}
