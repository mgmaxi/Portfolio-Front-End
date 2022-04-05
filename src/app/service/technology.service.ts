import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
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
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTechnologies(): Observable<Technology[]> {
    const url = `${this.apiUrl}/technologies`;
    return this.http.get<Technology[]>(url);
  }

  // Get all technologies from one person
  findByPersonId(person_id: number): Observable<Technology[]> {
    const url = `${this.apiUrl}/technologies/persons/${person_id}`;
    return this.http.get<Technology[]>(url);
  }

  // Create one technology
  addTechnology(newTechnology: Technology): Observable<any> {
    const url = `${this.apiUrl}/technologies`;
    return this.http.post<any>(url, newTechnology, httpOptions);
  }

  addTechnologyToPerson(
    person_id: number,
    technology_id: number
  ): Observable<any> {
    const url = `${this.apiUrl}/persons/${person_id}/technologies/${technology_id}`;
    return this.http.put<any>(url, httpOptions);
  }

  deleteTechnologyOfPerson(
    person_id: number,
    technology_id: number
  ): Observable<any> {
    const url = `${this.apiUrl}/persons/${person_id}/technologies/${technology_id}`;
    return this.http.delete<any>(url, { responseType: 'text' as 'json' });
  }

  deleteAllTechnologiesFromPerson(person_id: number): Observable<any> {
    const url = `${this.apiUrl}/persons/${person_id}/technologies`;
    return this.http.delete<any>(url, { responseType: 'text' as 'json' });
  }

  deleteTechnology(technology_id: number): Observable<any> {
    const url = `${this.apiUrl}/technologies/${technology_id}`;
    return this.http.delete<any>(url, { responseType: 'text' as 'json' });
  }
}
