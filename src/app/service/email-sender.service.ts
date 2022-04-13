import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Email } from '../models/email';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class EmailSenderService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  sendEmail(email: Email): Observable<any> {
    const url = `${this.apiUrl}/email`;
    return this.http.post<any>(url, email, httpOptions);
  }
}
