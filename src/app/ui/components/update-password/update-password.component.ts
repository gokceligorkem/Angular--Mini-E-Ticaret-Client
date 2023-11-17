import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, spinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { UserAuthService } from 'src/app/services/common/user-auth.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent extends BaseComponent implements OnInit{
  constructor(spinner:NgxSpinnerService,private userauthService:UserAuthService,
    private activeRoute:ActivatedRoute,
    private alertifyService:AlertifyService,
    private userService:UserService,private router:Router){
    super(spinner)
  }
  state:any;
  ngOnInit(): void {
    this.spinnerShow(spinnerType.Ballclimbingdot)
    this.activeRoute.params.subscribe({
      next: async params=>{
        const userId:string=params["userId"];
        const resetToken:string=params["resetToken"];
        this.state=await this.userauthService.verifyResetToken(resetToken,userId,()=>{
          
          this.spinnerHide(spinnerType.Ballclimbingdot);
        })
      }
    })
  }
  updatePassword(password:string,passwordConfirm:string){
    this.spinnerShow(spinnerType.Pacman)
    if(password!=passwordConfirm){
      this.alertifyService.message("Şifreleri doğrulayınız!",{
        messageType:MessageType.Error,
        position:Position.TopRight
      });
      this.spinnerHide(spinnerType.Pacman)
      return;
    }
    this.activeRoute.params.subscribe({
      next: async params=>{
        const userId:string=params["userId"];
        const resetToken:string=params["resetToken"];
       await this.userService.updatePassword(userId,resetToken,password,passwordConfirm,
        ()=>{
              this.alertifyService.message("Şifre başarıyla güncellenmiştir.",{
                position:Position.TopRight,
                messageType:MessageType.Success
              })
              this.router.navigate(["/login"])
              
       },
       error=>{
        
        console.error(error)
        
       });
       this.spinnerHide(spinnerType.Pacman)
      }
  
    })
   
  }
}
