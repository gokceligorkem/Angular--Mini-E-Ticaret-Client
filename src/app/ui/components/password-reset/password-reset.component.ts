import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, spinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { UserAuthService } from 'src/app/services/common/user-auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent extends BaseComponent {
constructor(spinner:NgxSpinnerService,private userauthService:UserAuthService,private alertify:AlertifyService){
  super(spinner);
}
passwordReset(txtemail:string){
  this.spinnerShow(spinnerType.Ballclimbingdot)
  this.userauthService.passwordReset(txtemail,()=>{
    this.spinnerHide(spinnerType.Ballclimbingdot)
    this.alertify.message("Mail başarıyla gönderildi.",{
      messageType:MessageType.Success,
      position:Position.TopRight
    })
  }
 )
}
}
