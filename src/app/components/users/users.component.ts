import { UserService } from './../../Services/user.service';
import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ExportExelService } from './../../Services/export-exel.service';
import {Select} from "@ngxs/store";
import {UserState} from "./state/user.state";
import {Observable} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Role, Status} from "../../model/user/user";



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild('userTable') userTable!: ElementRef;
  @Select(UserState) state$!: Observable<UserState.Model>

  role = Role
  status = Status
  userForm: any
  form!: FormGroup
  auth = true
  users: any
  dateFormat: Date =  new Date();
  pipe = new DatePipe('en-Us')

  constructor(private user: UserService,private router: Router, private formBuilder: FormBuilder) {
    UserState.actLoad.emit().subscribe(_ =>{}, error => {
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

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      user_name: ['', Validators.required],
      password: ['', Validators.required],
      full_name: ['', Validators.required],
      role: ['', Validators.required],
    })
    if(!!localStorage.getItem('Authen')) {
      this.user.getAll().subscribe(res => {
      this.users = res
    },(error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'ACCESS IS DENIED',
        confirmButtonText: 'Return Home',
        footer: 'Access denied by URL authorization policy on the Web server.'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/'])
        }
      })
    }))
    }
    else
      this.router.navigate(['/login'])
  }
  onAdd() {
    if (this.form.invalid == true) {
      Swal.fire('Can not be left blank');
      return
    }
    UserState.actAdd.emit(this.form.value).subscribe(_ => {
      UserState.actLoad.emit()
    },(error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'ACCESS IS DENIED',
        confirmButtonText: 'Return Home',
        footer: 'Access denied by URL authorization policy on the Web server.'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/'])
        }
      })
    }))
  }

  onChange(event:any, id: number) {
    console.log(event.target.value)
    UserState.actUpdate.emit({id: id, value: {role: event.target.value}}).subscribe(_ => {
      UserState.actLoad.emit()
    },(error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'ACCESS IS DENIED',
        confirmButtonText: 'Return Home',
        footer: 'Access denied by URL authorization policy on the Web server.'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/'])
        }
      })
    }))
  }

  onDisable(value: any, id: number) {
    UserState.actUpdate.emit({id: id, value: value}).subscribe(_ => {
      UserState.actLoad.emit()
    },(error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'ACCESS IS DENIED',
        confirmButtonText: 'Return Home',
        footer: 'Access denied by URL authorization policy on the Web server.'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/'])
        }
      })
    }))
  }
}
