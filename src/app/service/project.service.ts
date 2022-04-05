import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProjects(person_id: number): Observable<Project[]> {
    const url = `${this.apiUrl}/projects/persons/${person_id}`;
    return this.http.get<Project[]>(url);
  }

  addProject(person_id: number, newProject: Project): Observable<any> {
    const url = `${this.apiUrl}/projects/persons/${person_id}`;
    return this.http.post<any>(url, newProject, httpOptions);
  }

  updateProject(
    project_id: number,
    person_id: number,
    updatedProject: Project
  ): Observable<any> {
    const url = `${this.apiUrl}/projects/${project_id}/persons/${person_id}`;
    return this.http.put<any>(url, updatedProject, httpOptions);
  }

  deleteProject(project_id: number, person_id: number): Observable<any> {
    const url = `${this.apiUrl}/projects/${project_id}/persons/${person_id}`;
    return this.http.delete<any>(url, { responseType: 'text' as 'json' });
  }

  deleteAllProjectsFromPerson(person_id: number): Observable<any> {
    const url = `${this.apiUrl}/projects/persons/${person_id}`;
    return this.http.delete<any>(url, { responseType: 'text' as 'json' });
  }
}
