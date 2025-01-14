import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  search(search: string) {
    return this.http.get(`${environment.serviceBaseUrl}/user/search`, {
      params: {
        q: search,
      },
    });
  }
}
