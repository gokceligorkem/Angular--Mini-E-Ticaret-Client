import { FacebookLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, spinnerType } from 'src/app/base/base.component';
import { TokenResponse } from 'src/app/contracts/token/tokenresponse';
import { AuthService } from 'src/app/services/common/authservice.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { UserAuthService } from 'src/app/services/common/user-auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {
  constructor(private userAuthService:UserAuthService,
    spinner:NgxSpinnerService,
    private authService:AuthService,
    private route: ActivatedRoute,
    private router:Router,
    private socialAuthService: SocialAuthService,){
    super(spinner);
    socialAuthService.authState.subscribe(async(user:SocialUser)=>{
      this.spinnerShow(spinnerType.Squarejellybox)
     
      switch(user.provider){
      
        case "GOOGLE":
          await  userAuthService.googleLogin(user,()=>{
            this.authService.identityCheck();
            this.spinnerHide(spinnerType.Squarejellybox)
           })
           break;
        case "FACEBOOK":
           await userAuthService.facebookLogin(user,()=>{
            this.authService.identityCheck();
            this.spinnerHide(spinnerType.Squarejellybox)
            debugger
           })
           break;
           
      }
    });
 
  }
  ngOnInit(): void { 
  
  }
 
  login(txtUsernameOrEmail:string,txtPassword:string){
    this.spinnerShow(spinnerType.Ballclimbingdot)
   this.userAuthService.login(txtUsernameOrEmail,txtPassword,()=>{
    this.authService.identityCheck();
    this.route.queryParams.subscribe(params=>{
       const returnUrl= params["returnUrl"];
       if(returnUrl)
       this.router.navigate([returnUrl]);
    });
    this.spinnerHide(spinnerType.Ballclimbingdot);
   })
  }
  async facebookLogin(){   
     await  this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
