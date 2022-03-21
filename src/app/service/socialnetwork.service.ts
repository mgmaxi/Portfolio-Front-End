import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socialnetwork } from '../models/socialnetwork';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class SocialnetworkService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getSocialNetwork(person_id: number): Observable<Socialnetwork> {
    const url = `${this.apiUrl}/socialnetworks/persons/${person_id}`;
    return this.http.get<Socialnetwork>(url);
  }

  updateSocialNetwork(
    socialnetwork_id: number,
    person_id: number,
    updatedSocialNetwork: Socialnetwork
  ): Observable<any> {
    const url = `${this.apiUrl}/socialnetworks/${socialnetwork_id}/persons/${person_id}`;
    return this.http.put<any>(url, updatedSocialNetwork, httpOptions);
  }
}
