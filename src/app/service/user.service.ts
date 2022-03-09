import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private authURL = environment.authURL;
  private personIdSource = new BehaviorSubject<number>(0);
  person_id = this.personIdSource.asObservable();

  constructor(private httpClient: HttpClient) {}

  public getUserId(username: String): Observable<any> {
    const url = `${this.authURL}/users/${username}/userid`;
    return this.httpClient.get<any>(url);
  }

  public getPersonId(username: String): Observable<any> {
    const url = `${this.authURL}/users/${username}/persons`;
    return this.httpClient.get<any>(url);
  }

  changePersonId(person_id: number) {
    this.personIdSource.next(person_id);
  }
}
