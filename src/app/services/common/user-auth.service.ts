import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { CustomerToastrService, ToastrMessageType, ToastrPosition } from '../ui/customer-toastr.service';
import { Observable, firstValueFrom } from 'rxjs';
import { TokenResponse } from 'src/app/contracts/token/tokenresponse';
import { SocialUser } from '@abacritt/angularx-social-login';
import { Token } from '@angular/compiler';
import { state } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpClientService ,private toastrService: CustomerToastrService) {}
  async login(
    UsernameOrEmail: string,
    Password: string,
    callBackFunction: () => void
  ): Promise<any> {
    const observable: Observable<any | TokenResponse> =
      this.httpClientService.post<any | TokenResponse>(
        {controller: 'Auth',
          action: 'login'
          
        },
        { UsernameOrEmail, Password }
      );
    const tokenResponse: TokenResponse = (await firstValueFrom(
      observable
    )) as TokenResponse;

    if (tokenResponse) {
      localStorage.setItem('accessToken', tokenResponse.token.accessToken);
      localStorage.setItem('refreshToken', tokenResponse.token.refreshToken);
      this.toastrService.message(
        'Kullanıcı girişi başarıyla sağlanmıştır',
        'Giriş Başarılı',
        {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight,
        }
      );
    }

    callBackFunction();
  }
  async googleLogin(
    user: SocialUser,
    callBackFunction?: () => void
  ): Promise<any> {
    const observable: Observable<SocialUser | TokenResponse> =
      this.httpClientService.post<SocialUser | TokenResponse>(
        {
          controller: "Auth",
          action: "google-login ",
        },
        user
      );

    const tokenResponse: TokenResponse = (await firstValueFrom(
      observable
    )) as TokenResponse;
    if (tokenResponse)
      localStorage.setItem('accessToken', tokenResponse.token.accessToken);
      localStorage.setItem('refreshToken', tokenResponse.token.refreshToken);
    this.toastrService.message('Google ile bağlantı sağlandı', 'Başarılı', {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.TopRight,
    });
    callBackFunction();
  }

  async facebookLogin( user: SocialUser, callBackFunction?: () => void):Promise<any>{
    debugger
const observable:Observable<SocialUser| TokenResponse>=this.httpClientService.post<SocialUser| TokenResponse>({
  controller:"Auth",
  action:"facebook-login",
 
},user) 

const tokenResponse: TokenResponse = (await firstValueFrom(observable)) as TokenResponse;
if (tokenResponse)
  localStorage.setItem('accessToken', tokenResponse.token.accessToken);
  localStorage.setItem('refreshToken', tokenResponse.token.refreshToken);
this.toastrService.message('Facebook ile bağlantı sağlandı', 'Başarılı', {
  messageType: ToastrMessageType.Success,
  position: ToastrPosition.TopRight,
});
callBackFunction();

}

async refreshTokenLogin(refreshToken:string,callBackFunction?:(state)=>void):Promise<any>{
  const observable: Observable<any | TokenResponse> =
  this.httpClientService.post<any | TokenResponse>({
    action:"refreshtokenlogin",
    controller:"auth"
  },{refreshToken:refreshToken})
try {
  const tokenResponse:TokenResponse= await firstValueFrom(observable)as TokenResponse
  if(tokenResponse){
    localStorage.setItem('accessToken', tokenResponse.token.accessToken);
    localStorage.setItem('refreshToken', tokenResponse.token.refreshToken);
    
  }
  callBackFunction(tokenResponse ? true:false)
}
 catch  {
  callBackFunction(false)
}

}

async passwordReset(email:string,callBackFunction?:()=>void){
const observable:Observable<any>=this.httpClientService.post({
  controller:"auth",
  action:"password-reset"
},{email:email})
await firstValueFrom(observable);
callBackFunction();
}
async verifyResetToken(resetToken:string,userId:string,callBackFunction:()=>void):Promise<boolean>{
  const observable:Observable<any>=this.httpClientService.post({
    controller:"auth",
    action:"verify-reset-token"
  },{
    resetToken:resetToken,
    userId:userId
  })
  const state:boolean=await firstValueFrom(observable);
  callBackFunction();
  return state;
}
}
