import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Technology } from '../models/technology';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TechnologyService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  //get all technologies
  getTechnologies(): Observable<Technology[]> {
    const url = `${this.apiUrl}/technologies`;
    return this.http.get<Technology[]>(url);
  }

  //get all technologies from one person
  findByPersonId(person_id: number): Observable<Technology[]> {
    const url = `${this.apiUrl}/technologies/persons/${person_id}`;
    return this.http.get<Technology[]>(url);
  }

  //create one technology
  addTechnology(newTechnology: Technology): Observable<any> {
    const url = `${this.apiUrl}/technologies`;
    return this.http.post<any>(url, newTechnology, httpOptions);
  }

  //add one technology to a person
  addTechnologyToPerson(
    person_id: number,
    technology_id: number
  ): Observable<any> {
    const url = `${this.apiUrl}/persons/${person_id}/technologies/${technology_id}`;
    return this.http.put<any>(url, httpOptions);
  }

  // Delete technology of person
  deleteTechnologyOfPerson(
    person_id: number,
    technology_id: number
  ): Observable<any> {
    const url = `${this.apiUrl}/persons/${person_id}/technologies/${technology_id}`;
    return this.http.delete<any>(url, { responseType: 'text' as 'json' });
  }

  // Delete All technologies from person
  deleteAllTechnologiesFromPerson(person_id: number): Observable<any> {
    const url = `${this.apiUrl}/persons/${person_id}/technologies`;
    return this.http.delete<any>(url, { responseType: 'text' as 'json' });
  }

  //delete technology
  deleteTechnology(technology_id: number): Observable<any> {
    const url = `${this.apiUrl}/technologies/${technology_id}`;
    return this.http.delete<any>(url, { responseType: 'text' as 'json' });
  }
}
