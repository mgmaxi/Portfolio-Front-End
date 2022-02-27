import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/company';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<Company[]> {
    const url = `${this.apiUrl}/companies`;
    return this.http.get<Company[]>(url);
  }

  addCompany(newCompany: Company): Observable<any> {
    const url = `${this.apiUrl}/companies`;
    return this.http.post<any>(url, newCompany, httpOptions);
  }

  updateCompany(company_id: number, updatedCompany: Company): Observable<any> {
    const url = `${this.apiUrl}/companies/${company_id}`;
    return this.http.put<any>(url, updatedCompany, httpOptions);
  }

  deleteCompany(company_id: number): Observable<any> {
    const url = `${this.apiUrl}/companies/${company_id}`;
    return this.http.delete<any>(url, { responseType: 'text' as 'json' });
  }
}
