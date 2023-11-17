import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeendpointService {

  constructor(private httpClientService:HttpClientService) { }
  async assignRoleEndpoint(roles: string[], code: string,
     menu: string, successCallBack?: () => void, errorCallBack?: (error) => void) {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "AuthorizationEndpoints"
    }, {
      roles: roles,
      code: code,
      menu: menu
    })

    const promiseData = observable.subscribe({
      next: successCallBack,
      error: errorCallBack
    });
    return await promiseData
  }

 async getRolesEndPoint(code:string,menu:string,successCallBack?: () => void, errorCallBack?: (error) => void):Promise<string[]>{
    const observable: Observable<any> = this.httpClientService.post({
      controller:"AuthorizationEndpoints",
      action:"GetRolesEndPoint"
    },{
      code:code,
      menu:menu
    })
    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallBack)
    return (await promiseData).roles
  }

  hasPermission(action: string): boolean {
    // Bu metodun gerçek implementasyonunu projenize uygun şekilde yapmalısınız
    // Örneğin, bir API üzerinden kullanıcının yetki durumunu kontrol edebilirsiniz
    // API'ye gönderilecek request ve kontrol işlemleri burada yapılır
    return true; // Örnek olarak herkese izin verildiği varsayılsın
  }
}
