import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  search(search: string) {
    return this.http.get('http://localhost:3000/user/search', {
      params: {
        q: search,
      },
    });
  }
}
