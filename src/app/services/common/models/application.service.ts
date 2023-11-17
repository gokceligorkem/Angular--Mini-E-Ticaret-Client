import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { AuthorizeMenu } from 'src/app/contracts/authorizemenu';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private httpClientservice:HttpClientService) { }
 async getAuthorizeDefinitionEndpoint(){
    const observable:Observable<AuthorizeMenu[]>=this.httpClientservice.get<AuthorizeMenu[]>({
      controller:"Service"
    })
   return await firstValueFrom(observable);
  }
}
