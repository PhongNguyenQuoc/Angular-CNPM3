import { Component, OnInit } from '@angular/core';
import { Select }                             from '@ngxs/store'
import {SubjectState} from "./state/subject.state";
import * as model from  '../../model/subject/subject'
import {Observable} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  @Select(SubjectState) state$!: Observable<SubjectState.Model>

  form!: FormGroup
  active = model.Status.ACTIVE
  inactive = model.Status.INACTIVE
  status = model.Status

  constructor( private formBuilder: FormBuilder, private router: Router) {
    SubjectState.actLoad.emit().subscribe(_ =>{}, error => {
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
      name: ['', Validators.required],
      credits: ['', Validators.required],
      semester: ['', Validators.required],
    })
  }

  onAddSubmit() {
    if (this.form.invalid == true) {
      Swal.fire('Can not be left blank');
      return
    }
    this.form.patchValue({credits: 1})
    console.log(this.form.value)
    SubjectState.actAdd.emit(this.form.value).subscribe(res => {
      SubjectState.actLoad.emit()
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

  onUpdate(id: number, value: any) {
    SubjectState.actUpdate.emit({id, value}).subscribe(_ => {
      SubjectState.actLoad.emit()
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
