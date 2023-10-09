import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, spinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent extends BaseComponent implements OnInit {
  constructor(snipper:NgxSpinnerService){
    super(snipper);
  }
  ngOnInit(): void {
    this.spinnerShow(spinnerType.Squarejellybox)
  }
}
