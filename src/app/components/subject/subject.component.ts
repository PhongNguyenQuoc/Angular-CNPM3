import { Component, OnInit } from '@angular/core';
import { Select }                             from '@ngxs/store'
import {SubjectState} from "./state/subject.state";
import * as model from  '../../model/subject/subject'
import {Observable} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";

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

  constructor( private formBuilder: FormBuilder) {
    console.log(this.active)
    SubjectState.actLoad.emit()
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
    })
  }

  onUpdate(id: number, value: any) {
    console.log(value.toString())
    SubjectState.actUpdate.emit({id, value}).subscribe(_ => {
      console.log(value)
      SubjectState.actLoad.emit()
    }, err => {
      console.log(err)
    })
  }

}
