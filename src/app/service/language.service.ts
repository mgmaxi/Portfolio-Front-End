import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getLanguages(): Observable<Language[]> {
    const url = `${this.apiUrl}/languages`;
    return this.http.get<Language[]>(url);
  }

  addLanguage(newLanguage: Language): Observable<any> {
    const url = `${this.apiUrl}/languages`;
    return this.http.post<any>(url, newLanguage, httpOptions);
  }

  updateLanguage(
    language_id: number,
    updatedLanguage: Language
  ): Observable<any> {
    const url = `${this.apiUrl}/languages/${language_id}`;
    return this.http.put<any>(url, updatedLanguage, httpOptions);
  }

  deleteLanguage(language_id: number): Observable<any> {
    const url = `${this.apiUrl}/languages/${language_id}`;
    return this.http.delete<any>(url, { responseType: 'text' as 'json' });
  }
}
