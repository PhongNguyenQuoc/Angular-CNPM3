import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './../../Services/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  constructor(private LoginService: LoginService, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.formLogin.invalid == true) {
      Swal.fire('Can not be left blank');
      return
    }
    this.LoginService.login(this.formLogin.value).subscribe((res) => {
      this.router.navigate(['home'])
    },
    (error => {
      if(error.status === 401) {
        Swal.fire('account is incorrect');
      }
    })
    )
  }
}
