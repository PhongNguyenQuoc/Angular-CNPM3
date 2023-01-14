 import { Component, OnInit } from '@angular/core';
 import { HttpStatusCode} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
  }
  onRightClick(event: any) {
    event.preventDefault();
  }
}
