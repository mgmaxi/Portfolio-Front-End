import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Portfolio } from './Portfolio';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private apiURL = './assets/db/profileData.json';
  constructor(private http: HttpClient) {}

  getData(): Observable<Portfolio> {
    return this.http.get<Portfolio>(this.apiURL);
  }
}
