import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Language } from '../models/language';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getLanguages(): Observable<Language[]> {
    const url = `${this.apiUrl}/languages`;
    return this.http.get<Language[]>(url);
  }

  //get all languages from one person
  findByPersonId(person_id: number): Observable<Language[]> {
    const url = `${this.apiUrl}/languages/persons/${person_id}`;
    return this.http.get<Language[]>(url);
  }

  addLanguage(newLanguage: Language): Observable<any> {
    const url = `${this.apiUrl}/languages`;
    return this.http.post<any>(url, newLanguage, httpOptions);
  }

  //add one language to a person
  addLanguageToPerson(person_id: number, language_id: number): Observable<any> {
    const url = `${this.apiUrl}/persons/${person_id}/languages/${language_id}`;
    return this.http.put<any>(url, httpOptions);
  }

  // Delete language of person
  deleteLanguageOfPerson(
    person_id: number,
    language_id: number
  ): Observable<any> {
    const url = `${this.apiUrl}/persons/${person_id}/languages/${language_id}`;
    return this.http.delete<any>(url, { responseType: 'text' as 'json' });
  }

  // Delete All languages from person
  deleteAllLanguagesFromPerson(person_id: number): Observable<any> {
    const url = `${this.apiUrl}/persons/${person_id}/languages`;
    return this.http.delete<any>(url, { responseType: 'text' as 'json' });
  }

  deleteLanguage(language_id: number): Observable<any> {
    const url = `${this.apiUrl}/languages/${language_id}`;
    return this.http.delete<any>(url, { responseType: 'text' as 'json' });
  }
}
