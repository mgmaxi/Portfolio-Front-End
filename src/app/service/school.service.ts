import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { School } from '../models/school';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getSchools(): Observable<School[]> {
    const url = `${this.apiUrl}/schools`;
    return this.http.get<School[]>(url);
  }

  addSchool(newSchool: School): Observable<any> {
    const url = `${this.apiUrl}/schools`;
    return this.http.post<any>(url, newSchool, httpOptions);
  }

  updateSchool(school_id: number, updatedSchool: School): Observable<any> {
    const url = `${this.apiUrl}/schools/${school_id}`;
    return this.http.put<any>(url, updatedSchool, httpOptions);
  }

  deleteSchool(school_id: number): Observable<any> {
    const url = `${this.apiUrl}/schools/${school_id}`;
    return this.http.delete<any>(url, { responseType: 'text' as 'json' });
  }
}
