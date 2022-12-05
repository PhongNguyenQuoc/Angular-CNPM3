import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ExportExelService } from 'src/app/Services/export-exel.service';

@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.css']
})
export class MarkComponent implements OnInit {
  @ViewChild('mark') mark!: ElementRef;

  constructor( private exportService: ExportExelService) { }

  ngOnInit(): void {
  }
  export_exel() {
    this.exportService.exportTableElmToExcel(this.mark, 'user_data');
  }

}
