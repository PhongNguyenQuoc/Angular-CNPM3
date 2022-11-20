import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment as env } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UsersComponent } from './components/users/users.component';
import { SubjectComponent } from './components/subject/subject.component';
import { MarkComponent } from './components/mark/mark.component';
import { StudentComponent } from './components/student/student.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    UsersComponent,
    SubjectComponent,
    MarkComponent,
    StudentComponent,
    LoginComponent,
    LogoutComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AuthModule.forRoot({
      ...env.auth
    }),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
