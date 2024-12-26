import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  form!: FormGroup;

  constructor(
    private authService: AuthService,
    private matSnackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
    });
  }

  crearUsuario() {
    const { email, password, name } = this.form.value;
    this.authService.registerUser(name, email, password).subscribe({
      next: (res) => {
        this.router.navigate(['/auth']);
        this.matSnackBar.open('Usuario creado correctamente', 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['mat-error-alert'],
        });
      },
      error: (error) => {
        this.matSnackBar.open('Error al momento de crear el usuario', 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['mat-error-alert'],
        });
      },
    });
  }
}
