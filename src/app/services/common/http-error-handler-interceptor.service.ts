import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CustomerToastrService, ToastrMessageType, ToastrPosition } from '../ui/customer-toastr.service';
import { UserAuthService } from './user-auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { spinnerType } from 'src/app/base/base.component';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService:CustomerToastrService,
    private userAuthService:UserAuthService,private router:Router,private spinner:NgxSpinnerService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    return next.handle(req).pipe(catchError(error=>{
    switch(error.status){
      case HttpStatusCode.Unauthorized:
    
        this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken"),(state)=>{
          if(!state){

            const url=this.router.url
            if(url =="/products"){
              this.toastrService.message("Lütfen işlem için üye olunuz.","Yetkisiz işlem",{
                messageType:ToastrMessageType.Error,
                position:ToastrPosition.TopRight
              });
            }
            else
            this.toastrService.message("Bu işlem yapmaya yetkiniz yoktur.","Yetkisiz işlem",{
              messageType:ToastrMessageType.Error,
              position:ToastrPosition.TopRight
            });
          }
        }).then(data=>{
          this.toastrService.message("Bu işlem yapmaya yetkiniz yoktur.","Yetkisiz işlem",{
            messageType:ToastrMessageType.Error,
            position:ToastrPosition.TopRight
          });
        })
        break;  
      case HttpStatusCode.InternalServerError:
        this.toastrService.message("Sunucuya erişilmiyor","Sunucu hatası!",{
          messageType:ToastrMessageType.Error,
          position:ToastrPosition.TopRight
        });
        break;
      case HttpStatusCode.BadRequest:
        this.toastrService.message("Geçersiz istek yapıldı.","Geçersiz istek",{
          messageType:ToastrMessageType.Warning,
          position:ToastrPosition.TopRight
        });
        break;
      case HttpStatusCode.NotFound:
        this.toastrService.message("Sayfa bulunamadı","Sayfa bulunamadı",{
          messageType:ToastrMessageType.Warning,
          position:ToastrPosition.TopRight
        });
        break;  

        default:
          this.toastrService.message("Beklenmeyen bir hata oluştu.","Hata!",{
            messageType:ToastrMessageType.Error,
            position:ToastrPosition.TopRight
          });
          break;   
    }
      this.spinner.hide(spinnerType.Ballclimbingdot)
      return of(error);
    }));
  }
}
