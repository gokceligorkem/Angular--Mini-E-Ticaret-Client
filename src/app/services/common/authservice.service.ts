import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper:JwtHelperService)
   { }


   identityCheck(){
    const token: string = localStorage.getItem("accessToken");

    let expired: boolean;

    try {
      expired = this.jwtHelper.isTokenExpired(token);
    } catch (error) {
    
      expired = true;
    }
      _isAuthenticate=token !=null && !expired;
   }
   get isAuthenticate():boolean{
    return _isAuthenticate;
   };
}
export let _isAuthenticate:boolean;
