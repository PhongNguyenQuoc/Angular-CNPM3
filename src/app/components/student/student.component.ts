import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StudentService } from './../../Services/student.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {Select} from "@ngxs/store";
import {Observable} from "rxjs";
import { StudentState } from './state/student.state';
import {Status} from "../../model/student/student";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  students: any
  form!: FormGroup
  status= Status
  @Select(StudentState) state$!: Observable<StudentState.Model>

  constructor(private studentService: StudentService,private router: Router, private formBuilder: FormBuilder) {
    StudentState.actLoad.emit().subscribe(_ =>{}, error => {
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
          footer: 'Access denied by URL authorization policy on the Web server.'
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
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      birth_day: ['', Validators.required],
      gender: ['', Validators.required],
      birth_place: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      entry_point: ['', Validators.required],
    })


  }

  onAddSubmit() {
    if (this.form.invalid == true) {
      Swal.fire('Can not be left blank');
      return
    }
    StudentState.actAdd.emit(this.form.value).subscribe(_ => {
      StudentState.actLoad.emit()
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'ACCESS IS DENIED',
        confirmButtonText: 'Return Home',
        footer: 'Access denied by URL authorization policy on the Web server.'
      })
    })
  }

  onUpdate(id: number, value: any) {
    console.log(value)
    StudentState.actUpdate.emit({id: id, value: value}).subscribe(_ => {
      StudentState.actLoad.emit()
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
