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

  getTechnologies(): Observable<Technology[]> {
    const url = `${this.apiUrl}/technologies`;
    return this.http.get<Technology[]>(url);
  }

  addTechnology(newTechnology: Technology): Observable<any> {
    const url = `${this.apiUrl}/technologies`;
    return this.http.post<any>(url, newTechnology, httpOptions);
  }

  updateTechnology(
    technology_id: number,
    updatedTechnology: Technology
  ): Observable<any> {
    const url = `${this.apiUrl}/technologies/${technology_id}`;
    return this.http.put<any>(url, updatedTechnology, httpOptions);
  }

  deleteTechnology(technology_id: number): Observable<any> {
    const url = `${this.apiUrl}/technologies/${technology_id}`;
    return this.http.delete<any>(url, { responseType: 'text' as 'json' });
  }
}
