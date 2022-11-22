import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../../../assets/css/argon-dashboard.css']
})
export class AppComponent {
  title = 'Angular-student-project';
  constructor(public auth: AuthService) {}
}
