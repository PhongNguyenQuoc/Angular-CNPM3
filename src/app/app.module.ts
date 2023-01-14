import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule }               from '@ngxs/store'
import { NgxsEmitPluginModule }     from '@ngxs-labs/emitter'
import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot'
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
import { routes } from './app-routing.module';
import { CookieService } from 'ngx-cookie-service';
import { TokenInterceptorService } from './auth/_services/token-interceptor.service';
import {SubjectState} from "./components/subject/state/subject.state";
import {MarkState} from "./components/mark/state/mark.state";
import { MatFormFieldModule} from "@angular/material/form-field";
import { MatSelectModule} from "@angular/material/select";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatNativeDateModule} from '@angular/material/core';
import {StudentState} from "./components/student/state/student.state";
import {UserState} from "./components/users/state/user.state";
import {LogoutComponent} from "./components/logout/logout.component";
import { DashboardComponent } from './components/dashboard/dashboard.component';

const STATE = [
  SubjectState,
  MarkState,
  StudentState,
  UserState
]

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
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    RouterModule.forRoot(routes),
    NgxsModule.forRoot(STATE),
    NgxsEmitPluginModule.forRoot(),
    NgxsSelectSnapshotModule.forRoot(),
    BrowserAnimationsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  providers: [CookieService,{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService,multi:true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
