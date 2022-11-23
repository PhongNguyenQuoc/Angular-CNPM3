import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UsersComponent } from './components/users/users.component';
import { SubjectComponent } from './components/subject/subject.component';
import { MarkComponent } from './components/mark/mark.component';
import { StudentComponent } from './components/student/student.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { routes } from './app-routing.module';
import { CookieService } from 'ngx-cookie-service';
import { TokenInterceptorService } from './auth/_services/token-interceptor.service';

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
    RouterModule.forRoot(routes),
  ],
  providers: [CookieService,{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService,multi:true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
