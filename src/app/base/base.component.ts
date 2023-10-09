
import { NgxSpinnerService } from 'ngx-spinner';



export class BaseComponent {
constructor(private spinner:NgxSpinnerService){}

spinnerShow(spinnerName:spinnerType){
this.spinner.show(spinnerName)
setTimeout(() =>  this.spinnerHide(spinnerName), 1000);
}

spinnerHide(spinnerName:spinnerType){
  this.spinner.hide(spinnerName)
}

}


export enum spinnerType{
  Ballclimbingdot="s1",
  Pacman="s2",
  Squarejellybox="s3"
}
