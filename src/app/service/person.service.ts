import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../models/person';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getPerson(person_id: number): Observable<Person[]> {
    const url = `${this.apiUrl}/persons/${person_id}`;
    return this.http.get<Person[]>(url);
  }

  getPersonProfile(person_id: number): Observable<Person[]> {
    const url = `${this.apiUrl}/persons/${person_id}/profile`;
    return this.http.get<Person[]>(url);
  }

  updatePerson(
    user_id: number,
    person_id: number,
    updatedPerson: Person
  ): Observable<any> {
    const url = `${this.apiUrl}/persons/${person_id}/users/${user_id}`;
    return this.http.put<any>(url, updatedPerson, httpOptions);
  }
}
