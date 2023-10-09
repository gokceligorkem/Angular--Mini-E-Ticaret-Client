import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, spinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit{
  constructor(snipper:NgxSpinnerService){
    super(snipper);
  }
  ngOnInit(): void {
    this.spinnerShow(spinnerType.Squarejellybox)
  }
}
