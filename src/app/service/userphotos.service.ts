import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Userphotos } from '../models/userphotos';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserphotosService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  updateUserphotos(
    user_id: number,
    userphotos_id: number,
    updatedUserphotos: Userphotos
  ): Observable<any> {
    const url = `${this.apiUrl}/userphotos/${userphotos_id}/users/${user_id}`;
    return this.http.put<any>(url, updatedUserphotos, httpOptions);
  }

  updateUserProfilePhoto(
    user_id: number,
    userphotos_id: number,
    updatedUserphotos: Userphotos
  ): Observable<any> {
    const url = `${this.apiUrl}/userphotos/${userphotos_id}/profilephoto/users/${user_id}`;
    return this.http.put<any>(url, updatedUserphotos, httpOptions);
  }

  updateUserCoverPhoto(
    user_id: number,
    userphotos_id: number,
    updatedUserphotos: Userphotos
  ): Observable<any> {
    const url = `${this.apiUrl}/userphotos/${userphotos_id}/coverphoto/users/${user_id}`;
    return this.http.put<any>(url, updatedUserphotos, httpOptions);
  }
}
