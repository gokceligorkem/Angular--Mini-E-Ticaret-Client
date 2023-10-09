import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { BaseUrl } from 'src/app/contracts/baseurl';


@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpClientService:HttpClientService) {}

async getBaseStogare():Promise<BaseUrl>{
   const getObservable:Observable<BaseUrl>= this.httpClientService.get<BaseUrl>({
    action:"GetBaseUrl",
    controller:"files"
    })
    return await firstValueFrom(getObservable)
}
}