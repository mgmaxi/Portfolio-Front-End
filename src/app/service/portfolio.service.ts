import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Portfolio } from './Portfolio';
import { EducationList } from '../components/profile-education/EducationList';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private apiUrl = 'http://localhost:5000/';
  constructor(private http: HttpClient) {}

  /*   getData(): Observable<Portfolio> {
    return this.http.get<Portfolio>(this.apiUrl);
  } */

  getSection(section: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + section);
  }

  deleteItem(section: string, item: any): Observable<any[]> {
    const url = `${this.apiUrl + section}/${item.id}`;
    return this.http.delete<any[]>(url);
  }
}
