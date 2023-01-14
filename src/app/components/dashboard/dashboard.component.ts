import { Component } from '@angular/core';
import {UserState} from "../users/state/user.state";
import {Select} from "@ngxs/store";
import {Observable} from "rxjs";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  temp = 2
  @Select(UserState) state$!: Observable<UserState.Model>
  constructor(private router: Router) {
    UserState.actGetByID.emit({id: this.getUserInfo().userId}).subscribe(_ =>{}, error => {
      if(error.status == 504) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'ECONNREFUSED',
          confirmButtonText: 'Return Login',
          footer: 'Access denied by URL authorization policy on the Web server.'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/login'])
          }
        })
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'ACCESS IS DENIED',
          confirmButtonText: 'Return Home',
          footer: 'End Of Login Session.'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/'])
          }
        })
      }
    })
  }

  getUserInfo() {
    const token = localStorage.getItem('Authen');
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }
}
