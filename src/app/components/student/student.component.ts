import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StudentService } from './../../Services/student.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  students: any
  form!: FormGroup

  constructor(private studentService: StudentService,private router: Router, private formBuilder: FormBuilder) { }

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

    if(!!localStorage.getItem('Authen')) {
      this.studentService.getAll().subscribe(res => {
      this.students = res
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

  onAddSubmit() {
    if (this.form.invalid == true) {
      Swal.fire('Can not be left blank');
      return
    }
    this.studentService.add(this.form.value).subscribe(res => {
      alert(res)
    },(error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'ACCESS IS DENIED',
        confirmButtonText: 'Return Home',
        footer: 'Access denied by URL authorization policy on the Web server.'
      })
    }))
  }

}
