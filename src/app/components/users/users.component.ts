import { UserService } from './../../Services/user.service';
import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ExportExelService } from './../../Services/export-exel.service';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild('userTable') userTable!: ElementRef;

  auth = true
  users: any
  dateFormat: Date =  new Date();
  pipe = new DatePipe('en-Us')

  constructor(private user: UserService,private router: Router, private exportService: ExportExelService) { }

  ngOnInit(): void {
    if(this.auth==true) {
      this.user.getAll().subscribe(res => {
      this.users = res
    })
    }
    else
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

  export_exel() {
    this.exportService.exportTableElmToExcel(this.userTable, 'user_data');

  }

}
