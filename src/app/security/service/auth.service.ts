import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginUser } from '../models/login-user';
import { SignupUser } from '../models/signup-user';
import { environment } from 'src/environments/environment';
import { JwtDto } from '../models/jwt-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authURL = environment.authURL;

  constructor(private httpClient: HttpClient) {}

  public signup(signupUser: SignupUser): Observable<any> {
    return this.httpClient.post<any>(this.authURL + '/signup', signupUser);
  }

  public login(loginUser: LoginUser): Observable<JwtDto> {
    return this.httpClient.post<JwtDto>(this.authURL + '/login', loginUser);
  }

  public refresh(dto: JwtDto): Observable<JwtDto> {
    return this.httpClient.post<JwtDto>(this.authURL + '/refresh', dto);
  }
}
