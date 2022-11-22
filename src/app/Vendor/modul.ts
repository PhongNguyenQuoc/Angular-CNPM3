import { routes }                           from '../app-routing.module';
import { HttpClientModule }                     from '@angular/common/http';
import { RouterModule }                         from '@angular/router';
import { NgModule }                             from '@angular/core'
import { AppComponent } from '../app/app.component';
import { HomeComponent } from '../components/home/home.component';
import { UsersComponent } from '../components/users/users.component';
import { LoginComponent } from '../auth/login/login.component';
import { JwtState }                             from 'src/app/auth/login/state/login'

const COMPONENTS = [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UsersComponent
]

/**
 * Dependency module
 */

const MODULES = [
    HttpClientModule,
  RouterModule.forRoot(routes),
]

/**
 * Module Definition
 */
 @NgModule({
    declarations: COMPONENTS, imports: MODULES, providers: []
  })
  export class VendorModule {
  }