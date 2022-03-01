import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experience } from '../models/experience';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getExperiences(person_id: number): Observable<Experience[]> {
    const url = `${this.apiUrl}/experiences/persons/${person_id}`;
    return this.http.get<Experience[]>(url);
  }

  addExperience(
    person_id: number,
    company_id: number,
    newExperience: Experience
  ): Observable<any> {
    const url = `${this.apiUrl}/experiences/persons/${person_id}/companies/${company_id}`;
    return this.http.post<any>(url, newExperience, httpOptions);
  }

  updateExperience(
    experience_id: number,
    person_id: number,
    company_id: number,
    updatedExperience: Experience
  ): Observable<any> {
    const url = `${this.apiUrl}/experiences/${experience_id}/persons/${person_id}/companies/${company_id}`;
    return this.http.put<any>(url, updatedExperience, httpOptions);
  }

  deleteExperience(experience_id: number, person_id: number): Observable<any> {
    const url = `${this.apiUrl}/experiences/${experience_id}/persons/${person_id}`;
    return this.http.delete<any>(url, { responseType: 'text' as 'json' });
  }

  // Delete All experiences from person
  deleteAllExperiencesFromPerson(person_id: number): Observable<any> {
    const url = `${this.apiUrl}/experiences/persons/${person_id}`;
    return this.http.delete<any>(url, { responseType: 'text' as 'json' });
  }
}
