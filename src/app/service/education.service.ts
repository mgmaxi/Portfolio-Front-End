import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Education } from '../models/education';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getEducations(person_id: number): Observable<Education[]> {
    const url = `${this.apiUrl}/educations/persons/${person_id}`;
    return this.http.get<Education[]>(url);
  }

  addEducation(
    person_id: number,
    school_id: number,
    newEducation: Education
  ): Observable<any> {
    const url = `${this.apiUrl}/educations/persons/${person_id}/schools/${school_id}`;
    return this.http.post<any>(url, newEducation, httpOptions);
  }

  updateEducation(
    education_id: number,
    person_id: number,
    school_id: number,
    updatedEducation: Education
  ): Observable<any> {
    const url = `${this.apiUrl}/educations/${education_id}/persons/${person_id}/schools/${school_id}`;
    return this.http.put<any>(url, updatedEducation, httpOptions);
  }

  deleteEducation(education_id: number, person_id: number): Observable<any> {
    const url = `${this.apiUrl}/educations/${education_id}/persons/${person_id}`;
    return this.http.delete<any>(url, { responseType: 'text' as 'json' });
  }

  // Delete All educations from person
  deleteAllEducationsFromPerson(person_id: number): Observable<any> {
    const url = `${this.apiUrl}/educations/persons/${person_id}`;
    return this.http.delete<any>(url, { responseType: 'text' as 'json' });
  }
}
