import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { spinnerType } from 'src/app/base/base.component';
import { _isAuthenticate } from 'src/app/services/common/authservice.service';
import { CustomerToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/customer-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private customtoastr: CustomerToastrService,
    private spinner: NgxSpinnerService,
    
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot,) {
    this.spinner.show(spinnerType.Squarejellybox);
 

    if (!_isAuthenticate) {
      this.router.navigate(["login"], { queryParams: { returnUrl: state.url } });
      this.customtoastr.message(
        "Oturum açmanız gerekiyor!",
        "Yetkisiz Erişim",
        {
          messageType: ToastrMessageType.Info,
          position: ToastrPosition.TopRight
        }
      );
      
    }
    
    this.spinner.hide(spinnerType.Squarejellybox);
    return true;
  }
}
