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

  deleteItem(section: string, item: any): Observable<any> {
    const url = `${this.apiUrl + section}/${item.id}`;
    return this.http.delete<any[]>(url);
  }

  addItem(section: string, newItem: any): Observable<any> {
    const url = `${this.apiUrl + section}`;
    return this.http.post<any>(url, newItem, httpOptions);
  }
}
