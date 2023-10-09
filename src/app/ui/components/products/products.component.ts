import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, spinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {
  constructor(snipper:NgxSpinnerService){
    super(snipper);
  }
  ngOnInit(): void {
    this.spinnerShow(spinnerType.Squarejellybox)
  }
}
