import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ExportExelService } from 'src/app/Services/export-exel.service';
import {Select} from "@ngxs/store";
import {MarkState} from "./state/mark.state";
import {Observable} from "rxjs";

@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.css']
})
export class MarkComponent implements OnInit {
  @ViewChild('mark') mark!: ElementRef;

  @Select(MarkState) state$!: Observable<MarkState.Model>

  constructor( private exportService: ExportExelService) {
    MarkState.actLoad.emit({subject_id: 1})
  }

  ngOnInit(): void {
  }
  export_exel() {
    this.exportService.exportTableElmToExcel(this.mark, 'user_data');
  }

}
