import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AuthContextGuard } from './guards/auth.guard';
import { AppComponent } from './app.component';
import { CheckAuthenticationGuard } from './guards/check-authentication.guard';
import { InboxComponent } from './views/inbox/inbox.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthContextGuard],
  },
  {
    path: 'auth',
    component: LoginComponent,
    canActivate: [AuthContextGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthContextGuard],
  },
  {
    path: 'inbox',
    component: InboxComponent,
    canActivate: [AuthContextGuard, CheckAuthenticationGuard],
  },
  { path: '**', redirectTo: '' },
];
