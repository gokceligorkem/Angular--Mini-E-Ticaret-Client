import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
constructor(private spinner: NgxSpinnerService){
  this.spinner.show("s1");
  setTimeout(() => {
    
    this.spinner.hide("s1");
  }, 2000);
}

}
