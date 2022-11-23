import { UsersComponent } from './components/users/users.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './auth/login/login.component';
import {SubjectComponent} from './components/subject/subject.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarkComponent } from './components/mark/mark.component';
import { from } from 'rxjs';
import { AuthGuard } from './auth/_services/Auth.guard';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: '',canActivate:[AuthGuard],
    children: [
      {
        path: 'home', component: HomeComponent,
        children: [
          {path: 'users', component: UsersComponent},
          {path: 'mark', component: MarkComponent},

          {path: '**', redirectTo: 'home', pathMatch: 'full'}
        ]
      },
      {path: '**', redirectTo: 'home', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
