import { Component } from '@angular/core';
import { AuthService } from './services/common/authservice.service';
import { ToastrService } from 'ngx-toastr';
import { CustomerToastrService, ToastrMessageType, ToastrPosition } from './services/ui/customer-toastr.service';
import { Router } from '@angular/router';


declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public authService:AuthService,private toastrService:CustomerToastrService,private router:Router){
    authService.identityCheck();
  }
  signOut(){
localStorage.removeItem("accessToken");
this.authService.identityCheck();
this.router.navigate([""])
this.toastrService.message("Oturum kapatılmıştır.","Çıkış  Yapıldı.",{
  messageType:ToastrMessageType.Info,
  position:ToastrPosition.TopRight

})
}
}
