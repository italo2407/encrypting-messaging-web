import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../models/message.model';

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
    return this.http.post('http://localhost:3000/messages/send', {
      receiverEmail,
      title,
      content,
      senderId,
    });
  }

  getMessages(userId: string): Observable<Message []> {
    return this.http.get<Message []>('http://localhost:3000/messages/' + userId);
  }
}
