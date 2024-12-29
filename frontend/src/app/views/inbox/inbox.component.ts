import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/message.service';
import { CommonModule } from '@angular/common';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-inbox',
  imports: [CommonModule],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.scss'
})
export class InboxComponent {

  messages: (Message & { expanded?: boolean})[] = [];

  constructor(private authService: AuthService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getMessages(); 
  }

  getMessages() {
    const user = this.authService.getUser();
    const userId = user ? user.sub : undefined;
    this.messageService.getMessages(userId).subscribe((res: Message[]) => {
      this.messages = res.map(message => ({ ...message, expanded: false}));
    });
  }

  toggleExpand(message: Message & { expanded?: boolean}) {
    message.expanded = !message.expanded;
    if (message.expanded && !message.isRead) {
      message.isRead = true;
      this.messageService.markAsRead(message.id).subscribe();
    }
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(date).toLocaleDateString('en-EN', options);
  }
}
