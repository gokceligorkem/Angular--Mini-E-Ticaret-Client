import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CustomerToastrService, ToastrMessageType, ToastrPosition } from '../ui/customer-toastr.service';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService:CustomerToastrService,private userAuthService:UserAuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    return next.handle(req).pipe(catchError(error=>{
    switch(error.status){
      case HttpStatusCode.Unauthorized:
        this.toastrService.message("Bu işlem yapmaya yetkiniz yoktur.","Yetkisiz işlem",{
          messageType:ToastrMessageType.Error,
          position:ToastrPosition.TopRight
        });
        this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken")).then(data=>{
          
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
      
      return of(error);
    }));
  }
}
