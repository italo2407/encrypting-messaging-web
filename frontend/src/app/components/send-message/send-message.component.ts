import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { MessageService } from '../../services/message.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-send-message',
  imports: [
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './send-message.component.html',
  styleUrl: './send-message.component.scss',
})
export class SendMessageComponent implements OnInit {
  form!: FormGroup;
  filteredOptions: any[] = [];
  isLoading = false;

  constructor(
    private userService: UserService,
    private matDialog: MatDialog,
    private messageService: MessageService,
    private matSnackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      receiverEmail: new FormControl('', [Validators.required]),
    });

    this.form
      .get('receiverEmail')
      ?.valueChanges.pipe(
        debounceTime(300), // Espera 300ms entre cambios
        distinctUntilChanged(), // Ignora valores iguales consecutivos
        switchMap((value: string) => this.userService.search(value)) // Llama al servicio
      )
      .subscribe((options: any) => {
        this.filteredOptions = options; // Actualiza las opciones filtradas
      });
  }

  send() {
    this.isLoading = true;
    const { title, content, receiverEmail } = this.form.value;
    const sender = this.authService.getUser();
    const senderId = sender ? sender.sub : undefined;
    console.log(senderId);

    this.messageService
      .send(receiverEmail, title, content, senderId)
      .subscribe({
        next: (res) => {
          this.matSnackBar.open('Mensaje enviado exitosamente', 'Close', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        },
        error: (error) => {
          this.matSnackBar.open(
            'Hubo error al momento de enviar el mensaje',
            'Close',
            {
              horizontalPosition: 'right',
              verticalPosition: 'top',
            }
          );
          this.isLoading = false;
        },
        complete: () => {
          this.matDialog.closeAll();
          this.isLoading = false;
        },
      });
  }
}
