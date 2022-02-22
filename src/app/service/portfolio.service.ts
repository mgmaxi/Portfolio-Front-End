import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getSection(section: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + section);
  }

  addItem(section: string, newItem: any): Observable<any> {
    const url = `${this.apiUrl + section}`;
    return this.http.post<any>(url, newItem, httpOptions);
  }

  addItemMultipleParameters(
    section: string,
    section2: string,
    section2_id: number,
    section3: string,
    section3_id: number,
    newItem: any
  ): Observable<any> {
    const url = `${this.apiUrl}/${section}/${section2}/${section2_id}/${section3}/${section3_id}`;
    return this.http.post<any>(url, newItem, httpOptions);
  }

  updateItemMultipleParameters(
    section: string,
    section_id: number,
    section2: string,
    section2_id: number,
    section3: string,
    section3_id: number,
    newItem: any
  ): Observable<any> {
    const url = `${this.apiUrl}/${section}/${section_id}/${section2}/${section2_id}/${section3}/${section3_id}`;
    return this.http.put<any>(url, newItem, httpOptions);
  }

  deleteItem(section: string, item: any): Observable<any> {
    const url = `${this.apiUrl + section}/${item.id}`;
    return this.http.delete<any[]>(url);
  }

  deleteItemMultipleParameters(
    section: string,
    section_id: number,
    section2: string,
    section2_id: number
  ): Observable<any> {
    const url = `${this.apiUrl}/${section}/${section_id}/${section2}/${section2_id}`;
    return this.http.delete<any[]>(url, { responseType: 'text' as 'json' });
  }
}
