import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ExportExelService } from 'src/app/Services/export-exel.service';
import {Select} from "@ngxs/store";
import {MarkState} from "./state/mark.state";
import {Observable} from "rxjs";
import {SubjectState} from "../subject/state/subject.state";
import * as model from '../../model/mark/mark'
import Swal from "sweetalert2";
import {StudentState} from "../student/state/student.state";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.css']
})
export class MarkComponent implements OnInit {
  selectedValue!: any
  isLoader: boolean = false
  isSelectGrade: boolean = false
  status = model.Status
  studentId!: number
  grandeType!: any
  subjectSelected!: number
  scope!: number
  hasValue: boolean = true
  @ViewChild('data') mark!: ElementRef;

  @Select(MarkState) state$!: Observable<MarkState.Model>
  @Select(SubjectState) subjectState$!: Observable<SubjectState.Model>
  @Select(StudentState) studentState$!: Observable<StudentState.Model>

  constructor( private exportService: ExportExelService, private router: Router) {
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
    StudentState.actLoad.emit()
  }

  ngOnInit(): void {
  }

  /**
   * export exel
   */
  export_exel() {
    this.exportService.exportTableElmToExcel(this.mark, 'user_data');
  }

  loadMark(event: any) {
    console.log(this.subjectSelected)
    this.selectedValue = event.target.value
    this.isLoader = true

    MarkState.actLoad.emit({subject_id: event.target.value}).subscribe(res => {
      this.hasValue = true
    }, error => {
      Swal.fire('No Data')
      this.hasValue = false
    })
  }

  onSelectGrande() {
    this.isSelectGrade = true
  }

  onAdd(value: any ) {
    console.log(value)
    console.log(this.subjectSelected)
    MarkState.actAdd.emit(value).subscribe(_ => {
      MarkState.actLoad.emit({subject_id: this.selectedValue})
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
    MarkState.actUpdate.emit({subject_id: id, value}).subscribe(_ => {
      MarkState.actLoad.emit({subject_id: this.selectedValue})
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
