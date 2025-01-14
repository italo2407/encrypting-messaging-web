import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../models/message.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient) {}

  send(
    receiverEmail: string,
    title: string,
    content: string,
    senderId: string
  ) {
    return this.http.post(`${environment.serviceBaseUrl}/messages/send`, {
      receiverEmail,
      title,
      content,
      senderId,
    });
  }

  getMessages(userId: string): Observable<Message[]> {
    return this.http.get<Message[]>(
      `${environment.serviceBaseUrl}/messages/` + userId
    );
  }

  markAsRead(messageId: string) {
    return this.http.put(
      `${environment.serviceBaseUrl}/messages/${messageId}/markAsRead`,
      {}
    );
  }
}
