import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SendMessageComponent } from '../../components/send-message/send-message.component';
import { UserService } from '../../services/user.service';
import { MessageService } from '../../services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatDialogModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
})
export class HomeComponent {
  readonly dialog = inject(MatDialog);
  readonly router = inject(Router);

  openDialog() {
    this.dialog.open(SendMessageComponent, {
      width: '600px',
    });
  }

  goToInbox() {
    this.router.navigate(['/inbox']);
  }
}
